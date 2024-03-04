"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreContributors = void 0;
const llamaindex_1 = require("llamaindex");
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
function scoreContributors(prFiles, prCommits) {
    return __awaiter(this, void 0, void 0, function* () {
        // might need to specific GPT 4 turbo LLM if this doesnt' behave well
        const agent = new llamaindex_1.OpenAIAgent({
            verbose: true,
            systemPrompt,
        });
        console.log("prFiles: ", prFiles);
        console.log("prCommits: ", prCommits);
        // will probably need to loop through it.
    });
}
exports.scoreContributors = scoreContributors;
