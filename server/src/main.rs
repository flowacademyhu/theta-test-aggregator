// proc_macro_hygiene: https://github.com/rust-lang/rust/issues/54727
// decl_macro:         https://github.com/rust-lang/rust/issues/39412
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use rocket::config::{Config, Environment};

mod aggregator;
mod store;

fn main() {
    let config = match Config::build(Environment::Staging)
        .address("0.0.0.0")
        .port(8012)
        .finalize()
    {
        Ok(config) => config,
        Err(e) => panic!(e),
    };
    
    rocket::custom(config)
        .mount("/api", routes![aggregator::init_simulation])
        .manage(store::init())
        .launch();

    println!("Hello, world!");
}
