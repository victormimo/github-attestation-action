import axios, { AxiosInstance, all } from "axios";
import { queryGetMergedPRsByAuthor } from "./query";

export interface IPullRequest {
  id: string;
  title: string;
  permalink: string;
  baseRefName: string;
  deletions: number;
  number: number;
  additions: number;
  author: {
    login: string;
  };
}
export class GithubApiClient {
  private client: AxiosInstance;
  private restClient: AxiosInstance;

  constructor(gitApi?: string) {
    this.client = axios.create({
      baseURL: "https://api.github.com/graphql",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gitApi || process.env.GITHUB_API_KEY}`,
      },
    });

    this.restClient = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `Bearer ${gitApi || process.env.GITHUB_API_KEY}`,
      },
    });
  }

  async getPrFiles(owner: string, repo: string, pullNumber: number) {
    try {
      const response = await this.restClient.get(
        `/repos/${owner}/${repo}/pulls/${pullNumber}/files`
      );
      return response.data; // Returns an array of file objects
    } catch (error) {
      console.error("Error fetching PR files:", error);
      return [];
    }
  }

  async getPrCommits(owner: string, repo: string, pullNumber: number) {
    try {
      const response = await this.restClient.get(
        `/repos/${owner}/${repo}/pulls/${pullNumber}/commits`
      );
      return response.data; // Returns an array of commit objects
    } catch (error) {
      console.error("Error fetching PR commits:", error);
      return [];
    }
  }

  async mergedPRsByAuthor(
    owner: string,
    repository: string,
    author?: string
  ): Promise<IPullRequest[]> {
    const uniqueMergedPRs = new Set<IPullRequest>();

    try {
      let after = null;

      while (true) {
        const query = queryGetMergedPRsByAuthor(owner, repository, after);
        const response = await this.client.post("", { query });
        console.log("response.data: ", response.data);
        const prS = response.data.data?.repository?.pullRequests?.nodes || [];

        const filteredPRs = !author
          ? prS
          : prS?.filter(
              (pr: { author: { login: string } }) =>
                pr.author.login.toLowerCase() === author.toLowerCase()
            );

        if (!filteredPRs) {
          break;
        }

        filteredPRs.forEach((pr: IPullRequest) => uniqueMergedPRs.add(pr));

        after = response.data.data.repository.pullRequests.pageInfo.endCursor;

        if (!response.data.data.repository.pullRequests.pageInfo.hasNextPage) {
          break;
        }
      }
    } catch (err) {
      console.log("err: ", err);
    }

    return [...uniqueMergedPRs];
  }

  async getAdditionsAndDelegationsOfPr(
    owner: string,
    repository: string,
    author: string,
    pullRequestNumber: number
  ): Promise<{ additions: string; deletions: string }> {
    const allPrs = await this.mergedPRsByAuthor(owner, repository, author);

    const pr = allPrs.find((p) => +p.number === +pullRequestNumber);

    return {
      additions: (pr?.additions || 0).toString(),
      deletions: (pr?.deletions || 0).toString(),
    };
  }
}
