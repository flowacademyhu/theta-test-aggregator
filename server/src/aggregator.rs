use serde::{Deserialize, Serialize};
use rocket_contrib::json::Json;
use rocket::State;
use crate::store::{execute, Pool};
use postgres::types::ToSql;

#[post("/simulationResult", data = "<result>")]
pub fn init_simulation(result: Json<SimulationResult>, db: State<Pool>) -> &'static str {
    match result.insert(db) {
        Ok(_) => "success",
        Err(err) => &err[..],
    }
    // "Hello"
}

static table_name: String = String::from("results");

#[derive(Serialize, Deserialize, Debug)]
pub struct SimulationResult {
    id: Option<String>,
    triggered_by: Option<String>,
    branch_name: Option<String>,
    start_timestamp: Option<i64>,
    end_timestamp: Option<i64>,
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

impl SimulationResult {
    fn insert(self, db: State<Pool>) -> Result<(), String> {
        let insert_query = format!(r#"
            INSERT INTO {} (
                id,
                triggered_by,
                branch_name,
                start_timestamp,
                end_timestamp,
                commit_hash,
                status,
                error_message,
                short_description,
                payload_data,
                payload_text,
                sequence_number,
                invalid,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
        "#, table_name);
        execute(
            db,
            &insert_query[..],
            &[
                &self.id,
                &self.triggered_by,
                &self.branch_name,
                &self.start_timestamp,
                &self.end_timestamp,
                &self.commit_hash,
                &self.status,
                &self.error_message,
                &self.short_description,
                &self.payload_data,
                &self.payload_text,
                &self.sequence_number,
                &self.invalid
                // @TODO add created_at
            ],
        );
        Ok(())
    }

    fn prepare(self) -> Self {
        self // @TODO
    }
}