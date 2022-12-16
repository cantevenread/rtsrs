use std::fs;
use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};

fn main() -> std::io::Result<()> {
    let path = "db";

    // Check if the directory exists
    match fs::metadata(path) {
        Ok(metadata) => {
            if metadata.is_dir() {
                println!("{} is a directory", path);
            } else {
                println!("{} is not a directory", path);
            }
        }
        Err(_) => {
            println!("{} does not exist or there was an error accessing it", path);
        }
    }
    let output = Command::new("deno").arg("--version").output()?;
    let deno_version = String::from_utf8_lossy(&output.stdout);
    println!("{}", deno_version);

    // Check the version of the Rust compiler
    let output = Command::new("rustc").arg("--version").output()?;
    let rustc_version = String::from_utf8_lossy(&output.stdout);
    println!("{}", rustc_version);
    println!("RTSRS VERSION: #121622");

    let process = Command::new("deno")
        .arg("task")
        .arg("start")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;

    let stdout = process.stdout.expect("failed to get stdout handle");
    let stderr = process.stderr.expect("failed to get stderr handle");

    let stdout_reader = BufReader::new(stdout);
    let stderr_reader = BufReader::new(stderr);

    for line in stdout_reader.lines() {
        let line = line?;
        println!("[stdout] {}", line);
    }

    for line in stderr_reader.lines() {
        let line = line?;
        println!("[stderr] {}", line);
    }

    Ok(())
}
