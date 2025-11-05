# MCP Servers

This directory contains documentation and configuration for MCP (Model Context Protocol) server implementations for integrating external services with Claude Code.

## Active MCP Servers

The following MCP servers are hosted remotely and configured for this project:

### 1. GitHub MCP (Remote)
- **URL:** `https://api.githubcopilot.com/mcp/`
- **Authentication:** GitHub Personal Access Token
- **Capabilities:** Repository management, PR handling, issues, workflows
- **Status:** ✅ Active

### 2. Supabase MCP (Remote)
- **URL:** `https://mcp.supabase.com/mcp`
- **Authentication:** Project Reference ID
- **Capabilities:** Database queries, table management, auth status
- **Status:** ✅ Active

## Inactive MCP Servers

### Vercel MCP (Local)
- **Status:** ❌ Disabled (Security Concerns)
- **Reason:** Vercel API tokens provide broad access to all projects in your account/team with no project-level scoping available. For better security, use the Vercel CLI instead.
- **Alternative:** Use `vercel` CLI commands for deployments
- **Code Location:** `./vercel/` (kept for reference but not configured)

## Using Vercel CLI Instead

For Vercel operations, use the CLI:
```bash
vercel              # Deploy to preview
vercel --prod       # Deploy to production
vercel logs         # View deployment logs
vercel ls           # List deployments
```

## Configuration

All active MCP servers are configured in `.cursor/mcp.json` with credentials stored in `.cursor/.env.mcp`.

Run `./setup-mcp.sh` from the project root to configure GitHub and Supabase MCP servers.

## Adding More MCP Servers

To add additional MCP servers to this project:

1. Clone/create the MCP server in this directory
2. Add configuration to `.cursor/mcp.json`
3. Update `setup-mcp.sh` if needed
4. Document in `MCP_SETUP.md`

## Official MCP Server Registry

Browse available MCP servers at:
- https://github.com/modelcontextprotocol/servers
- https://mcp.so/

## Change Log

- **2025-11-05:** Removed Vercel MCP due to security concerns with broad API token access. Switched to Vercel CLI for deployment operations.
