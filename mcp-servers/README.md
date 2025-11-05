# MCP Servers

This directory contains local MCP (Model Context Protocol) servers for Claude Code integration.

## Vercel MCP Server

The Vercel MCP server enables Claude Code to interact with your Vercel deployments through natural language.

**Setup:**
The Vercel MCP server is automatically configured when you run `./setup-mcp.sh` from the project root.

**Manual setup:**
```bash
cd vercel
npm install
```

**Configuration:**
The server is configured in `.cursor/mcp.json` and uses the `VERCEL_API_TOKEN` from `.cursor/.env.mcp`.

## Adding More MCP Servers

To add additional MCP servers to this project:

1. Clone/create the MCP server in this directory
2. Add configuration to `.cursor/mcp.json`
3. Update `setup-mcp.sh` to install dependencies
4. Document in `MCP_SETUP.md`

## Official MCP Server Registry

Browse available MCP servers at:
- https://github.com/modelcontextprotocol/servers
- https://mcp.so/
