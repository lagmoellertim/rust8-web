use rust8::constants::{SCREEN_HEIGHT, SCREEN_WIDTH};
use rust8::graphic::Pixel;
use wasm_bindgen::prelude::*;
use web_sys::js_sys::JsString;
use web_sys::CanvasRenderingContext2d;

pub struct Screen {
    content: [[Pixel; SCREEN_WIDTH]; SCREEN_HEIGHT],
    renderer: CanvasRenderingContext2d,
}

fn renderer_from_canvas_ref(
    canvas_ref: &web_sys::HtmlCanvasElement,
) -> Result<CanvasRenderingContext2d, JsValue> {
    let context = canvas_ref
        .get_context("2d")?
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()?;

    Ok(context)
}

impl Screen {
    pub fn new(canvas_ref: &web_sys::HtmlCanvasElement) -> Result<Screen, JsValue> {
        Ok(Screen {
            content: [[Pixel::Off; SCREEN_WIDTH]; SCREEN_HEIGHT],
            renderer: renderer_from_canvas_ref(canvas_ref)?,
        })
    }

    pub fn draw(&mut self, framebuffer: &[[Pixel; SCREEN_WIDTH]; SCREEN_HEIGHT]) {
        for pixel_mode in [Pixel::Off, Pixel::On] {
            self.renderer
                .set_fill_style(&JsString::from(match pixel_mode {
                    Pixel::On => "#FFFFFF",
                    Pixel::Off => "#000000",
                }));

            for (y, row_data) in framebuffer.iter().enumerate() {
                for (x, pixel) in row_data.iter().enumerate() {
                    if *pixel == self.content[y][x] || *pixel != pixel_mode {
                        continue;
                    }

                    self.renderer.fill_rect(x as f64, y as f64, 1., 1.);
                }
            }
        }

        self.content = *framebuffer;
    }
}
