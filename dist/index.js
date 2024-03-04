"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.main = void 0;
const core = __importStar(require("@actions/core"));
const githubApiClient_1 = require("./github/githubApiClient");
const scoring_1 = require("./scoring");
const owner = "Lienfluent";
const repository = "lienfluent-app";
const pullRequestNumber = 581; // PR number you're interested in
const username = "victormimo";
const gitApiKey = "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 Second PAT: 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 CODES 11e87-f37a75b0dd-ff2f4270c6-f12a8a7f9c-24df5abd78-be423b9c0d-d1cfe2cb27-b0c470f31c-fe43128027-0385b905cc-a30f484511-4cba8ce825-b168667ca7-8b0af930d1-c71eeba2d3-633343f8a6-c4992";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const privateKey = core.getInput("private-key", {
            //   required: true,
            //   trimWhitespace: true,
            // });
            // const network =
            //   core.getInput("network", { required: false, trimWhitespace: true }) ||
            //   "sepolia";
            // const rpcUrl =
            //   core.getInput("rpc-url", { required: false, trimWhitespace: true }) ||
            //   defaultNetworks[network].rpc;
            // const gitApiKey = core.getInput("git-api", {
            //   required: false,
            //   trimWhitespace: true,
            // });
            // const _branch =
            //   core.getInput("branch", { required: false, trimWhitespace: true }) || "";
            // const _branches =
            //   core.getMultilineInput("branches", {
            //     required: false,
            //     trimWhitespace: true,
            //   }) || [];
            // const allowedBranches = (
            //   _branches === null || _branches === void 0 ? void 0 : _branches.length
            // )
            //   ? _branches
            //   : [_branch];
            // if (!privateKey) {
            //   throw new Error("private-key is required");
            // }
            // if (!network) {
            //   throw new Error("network is required");
            // }
            // if (!rpcUrl) {
            //   throw new Error("rpc-url is required");
            // }
            // if (!supportedNetworks.has(network)) {
            //   throw new Error(`network "${network}" is not supported`);
            // }
            // const repo = github?.context?.payload?.repository?.full_name || "";
            // const branch = github?.context?.ref?.replace("refs/heads/", "");
            // const username = github?.context?.payload?.pull_request?.user?.login;
            // const pullRequestLink = github?.context?.payload?.pull_request?.html_url;
            // const pullRequestName =
            //   github?.context?.payload?.pull_request?.title ||
            //   github?.context?.payload?.pull_request?.body ||
            //   "Name not found";
            const githubApiClient = new githubApiClient_1.GithubApiClient(gitApiKey);
            // const [owner, repository] = repo.split("/");
            // const pullRequestNumber =
            //   github?.context?.payload?.pull_request?.number || 0;
            const { additions, deletions } = yield githubApiClient.getAdditionsAndDelegationsOfPr(owner, repository, username, pullRequestNumber);
            console.log("here");
            const prFiles = yield githubApiClient.getPrFiles(owner, repository, pullRequestNumber);
            const prCommits = yield githubApiClient.getPrCommits(owner, repository, pullRequestNumber);
            const score = yield (0, scoring_1.scoreContributors)(prFiles, prCommits);
            // if (!repo) {
            //   console.log("repo is not available, skipping attestation.");
            //   return;
            // }
            // if (!branch) {
            //   console.log("branch is not available, skipping attestation.");
            //   return;
            // }
            // if (!username) {
            //   console.log("username is not available, skipping attestation.");
            //   return;
            // }
            // if (!pullRequestLink) {
            //   console.log("pullRequestLink is not available, skipping attestation.");
            //   return;
            // }
            // if (!pullRequestName) {
            //   console.log("pullRequestName is not available, skipping attestation.");
            //   return;
            // }
            // if (!allowedBranches.includes(branch)) {
            //   console.log(
            //     `branch "${branch}" is not an allowed branch, skipping attestation.`
            //   );
            //   return;
            // }
            // const isPullRequestMerged =
            //   !!github.context.payload.pull_request &&
            //   github.context.payload.action == "closed" &&
            //   github.context.payload.pull_request.merged;
            // if (!isPullRequestMerged) {
            //   console.log("event is not a pull request merge, skipping attestation.");
            //   return;
            // }
            // console.log("Inputs:", {
            //   allowedBranches,
            //   network,
            //   rpcUrl,
            //   repo,
            //   branch,
            //   username,
            //   pullRequestLink,
            //   pullRequestName,
            //   additions,
            //   deletions,
            // });
            // const { hash, uid } = await attest({
            //   privateKey,
            //   network,
            //   rpcUrl,
            //   repo,
            //   branch,
            //   username,
            //   pullRequestLink,
            //   pullRequestName,
            //   additions,
            //   deletions,
            // });
            // console.log("Transaction hash:", hash);
            // console.log("New attestation UID:", uid);
            // console.log("Setting outputs...");
            // core.setOutput("hash", hash);
            // core.setOutput("uid", uid);
            console.log("Done!");
        }
        catch (err) {
            console.log("... an error occurred in this step.");
            core.setFailed(err.message);
        }
    });
}
exports.main = main;
main().catch((error) => core.setFailed(error.message));
