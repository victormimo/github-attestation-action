import * as core from "@actions/core";
import * as github from "@actions/github";
import { attest } from "./attest";
import { defaultNetworks, supportedNetworks } from "./config";
import { GithubApiClient } from "./github/githubApiClient";
import { scoreContributors } from "./scoring";

import dotenv from "dotenv";
dotenv.config();

const owner = "victormimo";
const repository = "alpha-ai-0";
const pullRequestNumber = 6; // PR number you're interested in
const username = "victormimo";

const gitApiKey = process.env.GITHUB_API_KEY;

export async function main() {
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
    const githubApiClient = new GithubApiClient(gitApiKey);

    console.log({ githubApiClient });

    // const [owner, repository] = repo.split("/");
    // const pullRequestNumber =
    //   github?.context?.payload?.pull_request?.number || 0;
    // const { additions, deletions } =
    //   await githubApiClient.getAdditionsAndDelegationsOfPr(
    //     owner,
    //     repository,
    //     username,
    //     pullRequestNumber
    //   );

    const prFiles = await githubApiClient.getPrFiles(
      owner,
      repository,
      pullRequestNumber
    );
    const prCommits = await githubApiClient.getPrCommits(
      owner,
      repository,
      pullRequestNumber
    );

    const score = await scoreContributors(prFiles, prCommits);

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
  } catch (err: any) {
    console.log("... an error occurred in this step.");
    core.setFailed(err.message);
  }
}

main().catch((error) => core.setFailed(error.message));
