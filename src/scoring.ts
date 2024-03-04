import { OpenAIAgent, OpenAI } from "llamaindex";

import dotenv from "dotenv";
dotenv.config();

// Quality of code here could also be interesting for later
const systemPrompt = `
    You are a Quality Assurance Engineer in charge of reviewing a pull request and assessing the contributions
    of the contributors.

    You have the following jobs:
    1. Read the PR Files one by one and come to your own conclusion about the objective of the files.
    2. Read the PR Commits of each file and assess the contributions of the contributors to the success of the file and rank a score for each contributor.


    Score:
    - This score should be from 1-5. Here's a breakdown
        - 1: The contributor made no significant contribution to the file or small changes (like fixing typos or formatting)
        - 2: The contributor made a small contribution to the file (like adding a new function or fixing a bug)
        - 3: The contributor made a moderate contribution to the file (like adding a new feature or refactoring a significant portion of the file)
        - 4: The contributor made a significant contribution to the file (like refactoring a large portion of the file or adding a large feature)
        - 5: The contributor made an outstanding contribution to the file (like writing 80% or more of the file's content and goal)

        Ideally, you're able to use your knowledge of the purpose of each file's functionality and determine the score based on how important the contribution was to the success of the file.

`;

const llm = new OpenAI({ model: "gpt-4-0125-preview", temperature: 0 });

const agent = new OpenAIAgent({
  llm,
  prefixMessages: [
    {
      content: systemPrompt,
      role: "system",
    },
  ],
});

export async function scoreContributors(prFiles: any[], prCommits: any[]) {
  console.log("prFiles: ", prFiles);
  console.log("prCommits: ", prCommits);

  const message = `
    Below is a list of PR files. Please assess the contributions of the contributors to the success of the file and rank a score for each contributor.

    ${JSON.stringify(prFiles)}
  `;

  const respose = await agent.chat({
    message,
  });

  console.log("response: ", respose);
}
