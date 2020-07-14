use serde::{Deserialize, Serialize};
use rocket_contrib::json::Json;

#[derive(Serialize, Deserialize, Debug)]
pub struct SimulationResult {
    id: Option<String>,
    triggered_by: Option<String>,
    branch_name: Option<String>,
    start_timestamp: Option<u128>,
    end_timestamp: Option<u128>,
    commit_hash: Option<String>,
    status: Option<String>, 
    error_message: Option<String>,
    short_description: Option<String>,
    payload_data: Option<String>,
    payload_text: Option<String>,
    sequence_number: Option<i64>,
    invalid: Option<String>,
    created_at: Option<String>,
    updated_at: Option<String>,
}

#[post("/simulationResult", data = "<result>")]
pub fn init_simulation(result: Json<SimulationResult>) -> &'static str {
    println!("{:?}", result);
    "Hello"
}