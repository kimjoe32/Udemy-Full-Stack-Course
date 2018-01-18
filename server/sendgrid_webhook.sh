function localtunnel {
	lt -s a34eacbf238fa --port 5000
}

until localtunnel; do
	echo "localtunnel server crashed"
	sleep 2
done