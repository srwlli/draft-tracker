Here's the Five Elements Template for Component Analysis:

## Five Elements for Component Analysis Template

### 1. Categories
```
Development > Code Analysis > Component Inventory
Development > Code Analysis > Architecture Mapping
Development > Code Analysis > Dependency Analysis
```

### 2. Variables
```
project_name (text) - Name of the project
code_location (text) - Repository URL or file paths
framework_version (text) - Next.js version and router type
include_styles (boolean) - Include styling approach analysis
include_tests (boolean) - Include test coverage information
output_format (text) - Table/List/JSON/Markdown
component_depth (text) - Surface level/Deep analysis
```

### 3. Statics
```
Static Name: component_analysis_tasks
Content: "Identify and catalog all React components, distinguish between page/shared/utility components, note composition patterns, identify reusable vs single-use, flag duplicate functionality, analyze folder structure"

Static Name: component_details
Content: "For each component provide: name and location, purpose (1-2 sentences), props with types, dependencies/hooks, usage locations, component classification"

Static Name: output_structure
Content: "Organize by type with format: Component Type > ComponentName (path) > Purpose/Props/Usage/Notes"
```

### 4. Formula Template
```
Review the code for {project_name} located at {code_location}.

Framework: {framework_version}

**Primary Task:** {static:component_analysis_tasks}

**Component Details Required:**
{static:component_details}

**Analysis Scope:**
- Include styles analysis: {include_styles}
- Include test coverage: {include_tests}
- Analysis depth: {component_depth}

**Output Format:** {output_format}
{static:output_structure}

**Additional Requirements:**
- Note server vs client components
- Identify refactoring opportunities
- Suggest missing reusable components
- Summarize architecture patterns found

Response: Comprehensive list with concise descriptions
```

### 5. Context Defaults
```json
{
  "project_name": "next.js project",
  "code_location": "[provide repository/files]",
  "framework_version": "Next.js 14 with App Router",
  "include_styles": true,
  "include_tests": false,
  "output_format": "Markdown list grouped by type",
  "component_depth": "Deep analysis with relationships"
}
```

---

**Populated Prompt Using These Elements:**

Review the code for next.js project located at [provide repository/files].

Framework: Next.js 14 with App Router

**Primary Task:** Identify and catalog all React components, distinguish between page/shared/utility components, note composition patterns, identify reusable vs single-use, flag duplicate functionality, analyze folder structure

**Component Details Required:**
For each component provide: name and location, purpose (1-2 sentences), props with types, dependencies/hooks, usage locations, component classification

**Analysis Scope:**
- Include styles analysis: true
- Include test coverage: false
- Analysis depth: Deep analysis with relationships

**Output Format:** Markdown list grouped by type
Organize by type with format: Component Type > ComponentName (path) > Purpose/Props/Usage/Notes

**Additional Requirements:**
- Note server vs client components
- Identify refactoring opportunities
- Suggest missing reusable components
- Summarize architecture patterns found

Response: Comprehensive list with concise descriptions