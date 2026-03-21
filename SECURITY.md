# Security

## Deployment Baseline

Countcash is a static-first Next.js application. For public production deployments:

- deploy a production build, not `next dev`
- prefer a managed frontend host or a reverse proxy in front of the app
- expose only the public web entrypoints needed for the site
- never expose RDP (`3389`) or other management ports to the public internet
- restrict administrative access with VPN, bastion, or source IP allowlists
- keep `next` and the lockfile current with security patches

## Incident Response Notes

If a scanner reports exposed RDP or another remote admin service for `countcash.net`, treat that as an infrastructure incident:

1. Remove the public firewall or NAT rule immediately.
2. Verify the site is served only from the intended frontend host.
3. Rotate any credentials used on the exposed host.
4. Confirm that only expected public ports remain reachable.

## Reporting

Report repository security issues through the normal private maintainer channel rather than opening a public issue.
