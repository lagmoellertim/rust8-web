mod request_animation_frame_loop;
mod set_interval_loop;

pub use request_animation_frame_loop::RequestAnimationFrameLoop;
pub use set_interval_loop::SetIntervalLoop;

pub trait LoopControl {
    fn start(&mut self);
    fn stop(&mut self);
    fn is_running(&self) -> bool;
}
