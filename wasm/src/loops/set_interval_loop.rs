use std::time::Duration;

use wasm_bindgen::closure::Closure;
use wasm_bindgen::JsCast;
use web_sys::window;

use super::LoopControl;

pub struct SetIntervalLoop {
    interval: Duration,
    closure: Closure<dyn FnMut()>,
    interval_handle: Option<i32>,
}

fn set_interval_js_wrapper(closure: &Closure<dyn FnMut()>, interval: Duration) -> i32 {
    window()
        .unwrap()
        .set_interval_with_callback_and_timeout_and_arguments_0(
            closure.as_ref().unchecked_ref(),
            interval.as_millis() as i32,
        )
        .expect("setInterval call should have succeeded")
}

impl SetIntervalLoop {
    pub fn new(f: Box<dyn FnMut()>, interval: Duration) -> SetIntervalLoop {
        SetIntervalLoop {
            closure: Closure::wrap(f),
            interval,
            interval_handle: None,
        }
    }
}

impl LoopControl for SetIntervalLoop {
    fn start(&mut self) {
        if self.is_running() {
            return;
        }

        self.interval_handle = Some(set_interval_js_wrapper(&self.closure, self.interval));
    }

    fn stop(&mut self) {
        if !self.is_running() {
            return;
        }

        window()
            .unwrap()
            .clear_interval_with_handle(self.interval_handle.unwrap());
        self.interval_handle = None;
    }

    fn is_running(&self) -> bool {
        self.interval_handle.is_some()
    }
}
