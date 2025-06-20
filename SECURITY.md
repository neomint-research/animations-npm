# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The animations-npm team and community take security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### Where to Report

To report a security vulnerability, please use one of the following channels:

1. **Primary**: Email security@neomint.com with details of the vulnerability
2. **Secondary**: Open a security advisory on GitHub (maintainers only)
3. **Urgent**: For critical vulnerabilities with active exploitation, contact emergency@neomint.com

### What to Include

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Every 72 hours until resolved
- **Resolution Target**: 
  - Critical: 7 days
  - High: 14 days
  - Medium: 30 days
  - Low: 90 days

## Disclosure Policy

- Security issues will be disclosed publicly after patches are available
- We will credit reporters who responsibly disclose vulnerabilities
- We maintain a security advisory database for all reported issues

## Security Update Process

1. The security team will investigate and validate the report
2. A fix will be developed and tested
3. Security patches will be released for all supported versions
4. Public disclosure will follow the patch release

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue to discuss.

## PGP Key

For encrypted communication, please use our PGP key:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[PGP key would be inserted here in production]
-----END PGP PUBLIC KEY BLOCK-----
```

## Acknowledgments

We would like to thank the following individuals for responsibly disclosing vulnerabilities:

- [Contributors will be listed here]

## Related Information

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)