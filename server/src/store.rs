use postgres::types::ToSql;
use postgres::NoTls;
use r2d2_postgres::PostgresConnectionManager;
use rocket::State;

pub type Pool = r2d2::Pool<r2d2_postgres::PostgresConnectionManager<postgres::NoTls>>;

pub fn init() -> Pool {
    let manager = PostgresConnectionManager::new(
        "postgresql://postgres:secretpw@localhost:5432/test"
            .parse()
            .unwrap(),
        NoTls,
    );
    r2d2::Pool::new(manager).unwrap()
}

pub fn execute(db: State<Pool>, query: &str, params: &[&(dyn ToSql + Sync)]) -> String {
    let mut client = match db.clone().get() {
        Ok(c) => c,
        Err(e) => return format!("ERROR: getting database connection: {}", e),
    };
    match client.execute(query, params) {
        Ok(_) => format!("done"),
        Err(e) => format!("ERROR: performing database operation: {}", e),
    }
}

#[cfg(test)]
mod tests {
    use crate::store;

    #[test]
    fn storage_put() {
        // store::put()
    }
}