mod loops;
mod screen;

use std::cell::RefCell;
use std::rc::Rc;
use std::time::Duration;

use wasm_bindgen::prelude::*;
use web_sys::js_sys::{self, wasm_bindgen, JsString};

use crate::loops::{LoopControl, RequestAnimationFrameLoop, SetIntervalLoop};
use crate::screen::Screen;

#[wasm_bindgen]
pub struct Chip8 {
    chip8_rc: Rc<RefCell<rust8::Chip8>>,
    timer_loop: SetIntervalLoop,
    main_loop: RequestAnimationFrameLoop,
}

#[wasm_bindgen]
impl Chip8 {
    #[wasm_bindgen(constructor)]
    pub fn new(
        canvas_ref: &web_sys::HtmlCanvasElement,
        error_callback: js_sys::Function,
    ) -> Result<Chip8, JsValue> {
        let chip8_rc_1 = Rc::new(RefCell::new(rust8::Chip8::new()));

        let chip8_rc_2 = chip8_rc_1.clone();
        let timer_loop_fn = move || chip8_rc_2.borrow_mut().update_timers();

        let chip8_rc_3 = chip8_rc_1.clone();
        let mut screen = Screen::new(canvas_ref)?;
        let main_loop_fn = move || {
            let mut chip8 = chip8_rc_3.borrow_mut();
            for _ in 0..10 {
                if let Err(e) = chip8.cycle() {
                    let _ =
                        error_callback.call1(&JsValue::null(), &JsValue::from_str(&e.to_string()));
                }
            }

            if !chip8.screen.has_content_updated() {
                return;
            }

            screen.draw(chip8.screen.framebuffer());
            chip8.screen.reset_content_updated()
        };

        Ok(Chip8 {
            chip8_rc: chip8_rc_1,
            timer_loop: SetIntervalLoop::new(
                Box::new(timer_loop_fn),
                Duration::from_secs_f64(1. / 60.),
            ),
            main_loop: RequestAnimationFrameLoop::new(Box::new(main_loop_fn)),
        })
    }

    pub fn start(&mut self) {
        self.timer_loop.start();
        self.main_loop.start();
    }

    pub fn stop(&mut self) {
        self.timer_loop.stop();
        self.main_loop.stop();
    }

    pub fn key_up(&mut self, key: char) -> Result<(), JsValue> {
        self.chip8_rc
            .borrow_mut()
            .key_up(key.try_into().map_err(|_| JsString::from("Invalid key"))?);
        Ok(())
    }

    pub fn key_down(&mut self, key: char) -> Result<(), JsValue> {
        self.chip8_rc
            .borrow_mut()
            .key_down(key.try_into().map_err(|_| JsString::from("Invalid key"))?);
        Ok(())
    }

    pub fn load_program(&self, program: &[u8]) -> Result<(), JsValue> {
        self.chip8_rc
            .borrow_mut()
            .load_program(program)
            .map_err(|err| JsString::from(err.to_string()))?;

        Ok(())
    }
}
