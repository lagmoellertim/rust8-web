use std::cell::{Cell, RefCell};
use std::rc::Rc;

use wasm_bindgen::closure::Closure;
use wasm_bindgen::JsCast;
use web_sys::window;

use super::LoopControl;

type WrappedClosure = Rc<RefCell<Option<Closure<dyn FnMut()>>>>;

pub struct RequestAnimationFrameLoop {
    wrapped_closure: WrappedClosure,
    running: Rc<Cell<bool>>,
}

pub fn request_animation_frame_js_wrapper(closure: &Closure<dyn FnMut()>) {
    window()
        .unwrap()
        .request_animation_frame(closure.as_ref().unchecked_ref())
        .expect("requestAnimationFrame call should have succeeded");
}

impl RequestAnimationFrameLoop {
    pub fn new(mut func: Box<dyn FnMut()>) -> RequestAnimationFrameLoop {
        let running_1 = Rc::new(Cell::new(false));
        let running_2 = running_1.clone();

        let wrapped_closure: WrappedClosure = Rc::new(RefCell::new(None));
        let cloned_wrapped_closure = wrapped_closure.clone();

        *wrapped_closure.borrow_mut() = Some(Closure::new(move || {
            if !running_2.get() {
                return;
            }

            (func)();
            request_animation_frame_js_wrapper(
                cloned_wrapped_closure.borrow_mut().as_ref().unwrap(),
            );
        }));

        RequestAnimationFrameLoop {
            running: running_1,
            wrapped_closure,
        }
    }
}

impl LoopControl for RequestAnimationFrameLoop {
    fn start(&mut self) {
        if self.is_running() {
            return;
        }

        request_animation_frame_js_wrapper(self.wrapped_closure.borrow_mut().as_ref().unwrap());
        self.running.set(true);
    }

    fn stop(&mut self) {
        self.running.set(false);
    }

    fn is_running(&self) -> bool {
        self.running.get()
    }
}
