# servidor
tmux new-session -d -s dev -n backend
tmux send-keys -t dev:backend "cd backend && npm run dev" C-m

# cliente
tmux new-window -t dev:1 -n frontend
tmux send-keys -t dev:frontend "cd frontend && npm run dev" C-m

# recupera terminal
tmux attach-session -t dev