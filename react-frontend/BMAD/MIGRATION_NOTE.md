# BMAD Migration Note

You requested to move all BMAD related files to `react-frontend/BMAD`.

The documentation output has been successfully generated in `BMAD/_bmad-output`.

**Action Required:**
To complete the migration of the BMAD *tools* (the `_bmad` folder containing the agents and workflows), please close this agent session and manually move the `_bmad` folder into `BMAD/`.

```bash
# Example command (execute after session closes)
move _bmad BMAD/_bmad
```

Moving the `_bmad` folder *during* an active session may cause the agent to lose its context and crash, so this step is left for you to perform safely.
