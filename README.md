## Lab pre-read

### Changing project
1. From the left-hand side menu, click on **Account**
2. From the top navigation bar, select **Projects**
3. Click the desired project; everything will be scoped to that project

<img width="410" height="275" alt="image" src="https://github.com/user-attachments/assets/b4e736c3-8b7a-4043-89fa-3a690ff169ff" />

### Changing harness modules
- As part of this lab, we will switch between modules several times

In order to switch modules:
1. Click on the **nine dot** menu icon
2. Select the module relevant to the step
3. The lab begins in the CI/CD module

<img width="362" height="193" alt="image" src="https://github.com/user-attachments/assets/2d953dd9-b370-4308-9504-a9bf13f7fb9a" />


## Lab 1: Build

## Key Outcomes
- Configure a basic CI pipeline  
- Build and push artifacts to a remote repository  
- Run unit tests to verify build success  

## Overview
In this lab, the user sets up a CI pipeline that runs source code tests, builds the executable, and pushes the artifact to a remote Docker repository. This establishes the foundation for a deployable artifact that can be promoted through environments.

---

## Walkthrough

### Step 1: Create a Pipeline
1. In the Harness UI, from the left-hand menu, navigate to **Projects** and select your assigned project

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfhuMykMsIHl-7FjliWssHc0uwRpdLdrnq7GkGAI0g6UBZM69F1zpQ8ZA8N_vMqjpoGFYFR_weJk7OtOGGa2bksIaS6BlktwytmuJ1THM3e8O6tDT18HYWwFyGUye8ubsrHBChI8ORrCQ88JcKWpLjQ0DsXDS0NSZrkfZ4RUQ?key=cRG2cvp_PHVW0KG2Gq6Y_A)

2. From the left-hand side menu, select **Pipelines**
3. Click **+ Create a Pipeline**, enter the following values, then click **Start**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name       | <pre>`workshop`</pre>||
| How do you want to setup your pipeline | Inline | This indicates that Harness (rather than Git) will be the source of truth for the pipeline |
|`                `|`                            `|`                `|

---

### Step 2: Add a Build Stage
1. From Pipeline Studio, click **Add Stage** and select **Build** as the Stage Type
2. Enter the following values and click on **Set Up Stage**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Stage Name | <pre>`Build`</pre>||
| Clone Codebase | Enabled ||
| Repository Name | <pre>`harness-devsecops`</pre>||
|`                `|`                            `|`                `|

---

### Step 3: Configure Infrastructure
1. Navigate to the **Infrastructure** tab
2. Configure as follows:

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Infrastructure | Cloud ||
|`                `|`                            `|`                `|

---

### Step 4: Configure Execution Steps
Navigate to the **Execution** tab and add the following steps:

**Test Intelligence Step**
1. Click **Add Step**, then **Add Step** again
2. Select **Test Intelligence** from the Step Library

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Run Tests With Intelligence`</pre>||
| Command | <pre>`pip install pytest & cd ./python-tests`</pre>| The GitHub repo is a monorepo with application(s) and configuration in the same repo. Therefore we need to navigate to the application subfolder. |
|`                `|`                            `|`                `|

3. Click **Apply Changes**

**Compile Application (Template)**
1. Click **Add Step**, then **Use Template**
2. Select the **Compile Application** template

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Compile`</pre>||
|`                `|`                            `|`                `|

3. Click **Apply Changes**

**Build and Push to Docker**
1. Click **Add Step**, then **Add Step** again
2. Select **Build and Push an image to Docker Registry** from the Step Library

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Push to DockerHub`</pre>||
| Docker Connector | dockerhub ||
| Docker Repository | <pre>`nikpap/harness-workshop`</pre>||
| Tags | <pre>`<+variable.username>-<+pipeline.sequenceId>`</pre>| Click on the pin and select expression and paste the value |
| **Optional Configuration** |||
| Dockerfile | <pre>`/harness/frontend-app/harness-webapp/Dockerfile`</pre>| This tells Harness where the Dockerfile is for building the app |
| Context | <pre>`/harness/frontend-app/harness-webapp`</pre>| This tells from where to run the instructions included in the Dockerfile |
|`                `|`                            `|`                `|

3. Click **Apply Changes**

---

### Step 5: Save and Test the Pipeline
1. Click **Save** to finalize the pipeline
2. Click **Run** to manually execute it

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Branch Name | <pre>`main`</pre>| Prepopulated |
|`                `|`                            `|`                `|

> [!WARNING]
> Pipeline execution is rejected by the policy engine, let's create a compliant pipeline
> Proceed to the Lab 2: DevSecOps



## Lab 2: DevSecOps

## Key Outcomes
- Understand how governance plays a role in the path to production  
- Leverage reusable templates to standardize security scanning  
- Achieve DevSecOps practices with minimal developer friction  

## Overview
In this lab, the security team has implemented orchestration of **Fortify** and **OWASP** scans in reusable templates. Policies enforce the inclusion of these templates in all pipelines, ensuring security scans are always executed before deployment.

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXcLr5TGcKRWOjVgB_sCAHHEeLPyd6EBdnkt2-mq_imTkZbQMEwJD03Q1wZyhWqHxoCNIIYWJWlRbnZrvZn2pPYIwTzXlOGdhMDEgn-J2JnK7lVastmfpdwTqDHXjpP0DK3TgU1gM-Ec_0iZLicWV7KpgW2FdXUCcAtraDGaEz8hI3dpWGLXkg?key=cRG2cvp_PHVW0KG2Gq6Y_A)

---

## Walkthrough

### Step 1: Add Security Scanning Steps
1. In the existing pipeline, within the **Build** stage, **before** the **Push to DockerHub** step, click the **+** icon to add a new step
2. Select **Use Template**

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXeC5rTVxlk7DeZeU_cINwcKo6Nf2wVW9brQ9MiCEfppJwmU-uH3QcNZ53qTxhur57KeySksoDBg9EqjhgKOgAEDKon6iNz9cFxozBe9VZssV-t77VNo6t1zPUvm6e2NOZJDKncxd9c2GM4HE-h-L4cIOl4u6Uqx_azoKchMdg?key=cRG2cvp_PHVW0KG2Gq6Y_A)

3. Select **DevX Fortify Scan**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Fortify`</pre>||
|`                `|`                            `|`                `|

4. Click **Apply Changes**

---

### Step 2: Add OWASP Scan
1. In the existing pipeline, within the **Build** stage, **after** the **Push to DockerHub** step, click the **+** icon to add a new step
2. Select **Use Template**
3. Select **OWASP**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`OWASP`</pre>||
|`                `|`                            `|`                `|

4. Click **Apply Changes**

---

### Step 3: Run the Pipeline
1. Click **Save** and then **Run** to execute the pipeline

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Branch Name | <pre>`main`</pre>||
|`                `|`                            `|`                `|

2. After the **Build and Push** stage is complete, navigate to the **Security Tests** tab to see the deduplicated, normalized, and prioritized list of vulnerabilities discovered across your scanners

---

## Value Callouts

| Aspect | Description |
| :--- | :--- |
| **Shift Left Security** | Security scans run during the build phase, catching vulnerabilities before deployment. |
| **Template Reusability** | Security steps are defined once and reused across all pipelines, ensuring consistency. |
| **Policy Enforcement** | Governance policies ensure security scans cannot be skipped. |
| **Unified View** | All vulnerabilities are deduplicated and prioritized in a single dashboard. |


## Lab 3: Continuous Deploy - Frontend

## Key Outcomes
- Extend pipelines with deployment stages  
- Deploy Kubernetes services  
- Create custom Harness variables  

## Overview
In this lab, the user extends the existing pipeline to take the artifact built in the CI/Build stage and deploy it to a Kubernetes environment using a rolling deployment strategy.

---

## Walkthrough

### Step 1: Add a Deployment Stage
1. In the existing pipeline, click **Add Stage** and select **Deploy** as the Stage Type
2. Enter the following values and click **Set Up Stage**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Stage Name | <pre>`frontend`</pre>||
| Deployment Type | Kubernetes ||
|`                `|`                            `|`                `|

---

### Step 2: Configure Service
1. Click **+ Add Service** and configure as follows:


| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`frontend`</pre>||
| Deployment Type | Kubernetes ||
| **Add Manifest** |||
| Manifest Type | K8s Manifest ||
| K8s Manifest Store | Code ||
| Manifest Identifier | <pre>`templates`</pre>||
| Repository | <pre>`harness-devsecops`</pre>||
| Branch | <pre>`main`</pre>||
| File/Folder Path | <pre>`harness-deploy/frontend/manifests`</pre>||
| Values.yaml | <pre>`harness-deploy/frontend/values.yaml`</pre>||
| **Add Artifact Source** |||
| Artifact Repository Type | Docker Registry ||
| Docker Registry Connector | dockerhub ||
| Artifact Source Identifier | <pre>`frontend`</pre>||
| Image Path | <pre>`nikpap/harness-workshop`</pre>||
| Tag | <pre>`<+variable.username>-<+pipeline.sequenceId>`</pre>| Select value, then click on the pin and select expression and paste the value |
|`                `|`                            `|`                `|

2. Click **Save** to close the service window and then click **Continue**

---

### Step 3: Configure Environment
The target infrastructure has been pre-created. The application will be deployed to a Kubernetes cluster on the given namespace.

1. Click **- Select -** on the **Specify Environment** input box
2. Select **prod** environment and click **Apply Selected**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`prod`</pre>| Make sure to select the environment and infrastructure definition |
|`                `|`                            `|`                `|

3. Click **- Select -** on the **Specify Infrastructure** input box
4. From the dropdown select **k8s**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`k8s`</pre>||
|`                `|`                            `|`                `|

5. Click **Continue**

---

### Step 4: Configure Execution Strategy
1. Select **Rolling** and click **Use Strategy**
2. The frontend is a static application, so no need for canary deployment

---

### Step 5: Save and Run
1. Click **Save** to finalize the deployment stage
2. Click **Run** to execute the pipeline

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Branch Name | <pre>`main`</pre>||
|`                `|`                            `|`                `|

---

## Value Callouts

| Aspect | Description |
| :--- | :--- |
| **Unified Pipeline** | CI and CD are managed in a single pipeline, reducing handoffs. |
| **Kubernetes Native** | Harness provides native Kubernetes support with manifest management. |
| **Environment Reusability** | Environments and infrastructure can be reused across multiple services. |


## Lab 4: Continuous Deploy - Backend

## Key Outcomes
- Utilize complex deployment strategies to reduce blast radius  
- Implement approval gates for production deployments  

## Overview
In this lab, the user adds a backend deployment stage using a canary deployment strategy with manual approval gates to minimize risk during production releases.

---

## Walkthrough

### Step 1: Add Backend Deployment Stage
1. In the existing pipeline, click **Add Stage** and select **Deploy** as the Stage Type
2. Enter the following values and click **Set Up Stage**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Stage Name | <pre>`backend`</pre>||
| Deployment Type | Kubernetes ||
|`                `|`                            `|`                `|

---

### Step 2: Configure Service
1. Click **- Select -** on the **Select Service** input box
2. Select **backend**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`backend`</pre>||
|`                `|`                            `|`                `|

3. Click **Apply Selected** and then click **Continue**

---

### Step 3: Configure Environment
The target infrastructure has been pre-created and was used in the previous stage. To reuse the same environment:

1. Click **- Propagate Environment From**
2. Select **Stage [frontend]**
3. Click **Continue**

---

### Step 4: Configure Canary Deployment
1. Select **Canary** and click **Use Strategy**
2. **After** the canary deployment and **before** the canary delete step, add a **Harness Approval** step

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Approval`</pre>||
| User Groups | All Project Users | Select project to see the "All Project Users" option |
|`                `|`                            `|`                `|

3. Click **Apply Changes**

---

### Step 5: Save and Run
1. Click **Save** and then click **Run** to execute the pipeline

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Branch Name | <pre>`main`</pre>||
|`                `|`                            `|`                `|

2. While the canary deployment is ongoing and waiting for approval, navigate to the web page and see if you can spot the canary (use the check release button)
3. From the left hand side menu navigate to project settings
4. Select **project variables**
5. The url can exist within the **lab_endpoint** variable 
<img width="1692" height="302" alt="image" src="https://github.com/user-attachments/assets/5a215845-eadc-479d-9c81-5185bf039243" />



![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfmb1N3lAe0EOnEun9neU9y3ilqy3HbxfnWfUMzF3FsykslwgQfU_W4pE0wlt5kYSp6_mTs7cVP0anhJ7uvtsytal2qX3ZEq3vvOT3DOBUzE9SZ3rpwkAHP6e_ExdRbo5VmN2kpxdFlp6u8iGaKwhW_uyAohEmJurkjmEB2Ww?key=cRG2cvp_PHVW0KG2Gq6Y_A)

---

### Step 6: Replace manual approval with continuous verification
1. Edit the existing pipeline 
2. Select the backend stage and find the **Harness Approval** between the Canary Deploy and Canary Destroy steps
3. Delete the **Harness Approval** step
4. **After** the canary deployment and **before** the canary delete step, add a **Verify** step 

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Verify`</pre>||
| Continuous Verification Type | Canary ||
| Duration | 5 min ||
|`                `|`                            `|`                `|

5. Click **Save** and then click **Run** to execute the pipeline

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Branch Name | <pre>`main`</pre>||
|`                `|`                            `|`                `|

---

## Value Callouts

| Aspect | Description |
| :--- | :--- |
| **Progressive Delivery** | Canary deployments reduce risk by gradually rolling out changes. |
| **Manual Gates** | Approval steps ensure human oversight for critical deployments. |
| **Environment Propagation** | Reusing environments across stages reduces configuration duplication. |


## Lab 5: Validate Release

## Key Outcomes
- Identify traffic differences between normal and canary instances  
- Automate release validation  

## Overview
In this lab, the user validates canary deployments by observing traffic distribution and monitoring application behavior during progressive rollouts.

---

## Walkthrough

### Step 1: Observe Canary Traffic
1. While the canary deployment is ongoing, navigate to the web page

3. From the left hand side menu navigate to project settings
4. Select **project variables**
5. The url can exist within the **lab_endpoint** variable 
<img width="1692" height="302" alt="image" src="https://github.com/user-attachments/assets/5a215845-eadc-479d-9c81-5185bf039243" />

6. Drill down to the **Distribution Test** tab
7. Click the **Start** button to run traffic generation
8. Observe the traffic distribution between canary and stable instances

---

### Step 2: Validate Pipeline Execution
1. Return to the pipeline execution in Harness
2. Validate the outcome of the verification step
3. Observe how Harness automatically evaluates metrics during the canary phase

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXdbAmEJ5zQPsKlw_nEknWvYo97pm5eWCXr6vU8-GgIL0ulAOSH9N07PoEcVSknARVQo7Tgj1s31VHqR1I3hu2dMIO1rIX5HHcmTPXoQPoyo8CPv13OhnJN5WVcZqSwUXzdDHmm3PxUnhtpGVl0PAMJ_1wnuodvUbVPBOdnGKQ?key=cRG2cvp_PHVW0KG2Gq6Y_A)
![](https://lh7-us.googleusercontent.com/docsz/AD_4nXf-5oWX9OfvdmEb9MBm2_h2KKAa_QwmiJoM0fiKrTuxAr6GR4wxeulSlk48gyBK3dykrtIslDSkxpiGytrxH0JaxaQ4ZgTYxbmc8OenAH3nhGCvvOAxkWVjVBp1TRg_qQQi9z8OrNPK4udPtNL1LIyym6Ch5IMzrulFOcXhOQ?key=cRG2cvp_PHVW0KG2Gq6Y_A)

---

### Bonus Activities
- If verification fails, Harness defaults to manual intervention. Decide what happens next (rollback, ignore, etc.)
- Add a canary rollout from 10% to 50% traffic and observe how this impacts traffic distribution

---

## Value Callouts

| Aspect | Description |
| :--- | :--- |
| **Automated Validation** | Harness validates deployments automatically, reducing manual testing. |
| **Traffic Shaping** | Canary deployments allow controlled traffic distribution for risk mitigation. |

## Lab 6: Governance / Policy as Code

## Key Outcomes
- Create policies that evaluate when editing pipelines  
- Create policies that evaluate during pipeline execution  
- Test policy enforcement  

## Overview
In this lab, the user creates and applies policies as code to enable governance and promote self-service. Policies ensure that critical steps like approvals are always included in production pipelines.

---

## Walkthrough

### Step 1: Create a Policy to Require Approvals
1. From the secondary menu, select **Project Settings**
2. Select **Governance Policies**
3. Click **Build a Sample Policy**
4. From the suggested list, select **Pipeline - Approval** and click **Next**
5. Click **Next: Enforce Policy**
6. Set the values according to the table below and confirm

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Trigger Event | On Run ||
| Failure Strategy | Error & exit ||
|`                `|`                            `|`                `|

---

### Step 2: Test the Policy
1. Open your pipeline
2. Try to run the pipeline and note the failure due to lack of an approval stage
3. Click **Save** and note the failure due to lack of an approval stage

---

### Step 3: Add Approval Steps to Satisfy Policy
**Frontend Stage**
1. Open the pipeline in edit mode and navigate to the **frontend** stage
2. Before the rolling deployment step, add a **Harness Approval** step

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Step Name | <pre>`Approval`</pre>||
| Type of Approval | Harness Approval ||
| User Groups | All Project Users ||
|`                `|`                            `|`                `|

3. Click **Apply Changes**

**Backend Stage**
1. Navigate to the **backend** stage
2. Before the canary deployment block, add a **Harness Approval** step with the same configuration
3. Click **Save** and note that the save succeeds without any policy failure

---

## Value Callouts

| Aspect | Description |
| :--- | :--- |
| **Guardrails, Not Roadblocks** | Policies surface issues early without slowing down developers who follow best practices. |
| **Policy-as-Code** | Governance is defined in code and version-controlled—just like everything else. |
| **Scalable Compliance** | Teams can move fast while meeting security and audit requirements at scale. |


## Lab 7: Governance / Policy as Code (Advanced)

## Key Outcomes
- Block critical CVEs from reaching production  
- Enforce security policies during runtime  

## Overview
In this lab, the user creates an advanced policy that blocks deployments when critical vulnerabilities are detected by security scanners like OWASP.

---

## Walkthrough

### Step 1: Create a Policy to Block Critical CVEs
1. From the secondary menu, select **Project Settings**
2. Select **Policies**
3. Click the **Policies** tab
4. Click **+ New Policy**

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Runtime OWASP CVEs`</pre>||
|`                `|`                            `|`                `|

5. Click **Apply**
6. Set the REGO policy to the following and click **Save**

```opa
package pipeline_environment
deny[sprintf("Node OSS Can't contain any critical vulnerability '%d'", [input.NODE_OSS_CRITICAL_COUNT])] {  
   input.NODE_OSS_CRITICAL_COUNT != 0
}
```

---

### Step 2: Create a Policy Set
1. Select the **Policy Sets** tab
2. Click **+ New Policy Set** and configure as follows:

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Criticals Not Allowed`</pre>||
| Entity Type | Custom ||
| Event Evaluation | On Step ||
| Policy to Evaluate | Runtime OWASP CVEs ||
|`                `|`                            `|`                `|

3. Toggle the **Enforced** button

---

### Step 3: Add Policy to Pipeline
1. Open your pipeline
2. Go to a previous execution and copy the **CRITICAL** output variable from the OWASP step like so:

![](https://lh7-us.googleusercontent.com/docsz/AD_4nXfYQ7ba5Q_cQ9xy2AFVZ5Mt0iZPYbyQDmBonp0pBQA13Z_IUeYdK8gRSbddtf_V3bSRfbhKWDbRSUVJTx3BTCc_VmwLIWyWLkdh89nLh0sEBA6fqQxTy0NADZ0YPZwCirNycRVGUQACdItaBotovPs5Hg6CmRpQHk5ysgV6RUlhSbIbkNxmHAo?key=cRG2cvp_PHVW0KG2Gq6Y_A)

3. Select the **frontend** stage
4. Before the **Rollout Deployment** Step Group, add a **Policy** type step

| Input      | Value     | Notes |
| ---------- | ----------------------  | ----- |
| Name | <pre>`Policy - No Critical CVEs`</pre>||
| Entity Type | Custom ||
| Policy Set | Criticals Not Allowed | Make sure to select the Project tab |
| Payload | <pre>`{"NODE_OSS_CRITICAL_COUNT": <variable>}`</pre>| Set the field type to Expression, then replace `<variable>` with the OWASP output variable CRITICAL path |
|`                `|`                            `|`                `|

5. Click **Apply Changes**

---

### Step 4: Test the Policy
1. Save the pipeline and execute
2. Note that the pipeline fails at the policy evaluation step due to critical vulnerabilities being found by OWASP

---

## Value Callouts

| Aspect | Description |
| :--- | :--- |
| **Security by Default** | Critical vulnerabilities are automatically blocked from production. |
| **Runtime Enforcement** | Policies evaluate real scan results, not just configuration. |
| **Risk Mitigation** | High-severity issues are caught before deployment, reducing attack surface. |
| **Compliance Automation** | Security policies are enforced consistently across all pipelines without manual oversight. |
