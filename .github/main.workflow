workflow "Default" {
  resolves = ["docker://node:8"]
  on = "push"
}

action "docker://node:8" {
  uses = "docker://node:8"
  args = "npm install"
}
