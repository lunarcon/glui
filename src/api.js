import axios from 'axios';
import { Link } from '@fluentui/react-components';
const url = localStorage.getItem("gitlab_url");
const token = localStorage.getItem("token");
const main_gid = localStorage.getItem("main_gid");

async function getSubgroups() {
    const response = await axios.get(
      `${url}/api/v4/groups/${main_gid}/subgroups?simple=true&per_page=100`,
      {
        headers: {
          "PRIVATE-TOKEN": token,
        },
      }
    );
  
    return response.data.map((subgroup) => subgroup.id);
}

async function getRepositories(subgroup_id) {
  const response = await axios.get(
    `${url}/api/v4/groups/${subgroup_id}/projects?simple=true&per_page=100`,
    {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    }
  );

  return response.data
}

export async function getAllRepositories() {
  const subgroups = await getSubgroups();

  let repositories = [];

  for (let subgroup of subgroups) {
    let repos = await getRepositories(subgroup);

    for (let repo of repos) {
      repo.cistatus = await getBranchCIStatus(repo.id, "main");
      repo.branches = await getBranches(repo.id);
      repo.latestcommit = await getLatestCommit(repo.id);
    }

    repositories = repositories.concat(repos);
  }

  return repositories;
}

async function getBranchCIStatus(repoid, branch) {
  return axios.get(
    `${url}/api/v4/projects/${repoid}/pipelines?ref=${branch}&per_page=1`,
    {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    }
  ).then((response) => {
    if (response.data.length === 0) {
      return "No pipelines";
    }
    return response.data[0].status;
  });
}

async function getBranches(repoid) {
  return axios.get(
    `${url}/api/v4/projects/${repoid}/repository/branches?per_page=100`,
    {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    }
  ).then((response) => {
    return response.data.map((branch) => branch.name);
  });
}

async function getLatestCommit(repoid) {
  return axios.get(
    `${url}/api/v4/projects/${repoid}/repository/commits?per_page=1`,
    {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    }
  ).then((response) => {
    let dat= response.data[0].committed_date;
    let commit_url = response.data[0].web_url;
    let commit_id = response.data[0].id;
    let now = new Date();
    let then = new Date(dat);
    let diff = now - then;
    let diffHours = Math.floor(diff / 1000 / 60 / 60);
    let diffDays = Math.floor(diffHours / 24);
    let diffWeeks = Math.floor(diffDays / 7);

    let linkText = "";

    if (diffWeeks > 0) {
      linkText = diffWeeks + " Weeks ago";
    } else if (diffDays > 0) {
      linkText = diffDays + " Days ago";
    } else if (diffHours > 0) {
      linkText = diffHours + " Hours ago";
    } else {
      linkText = "Just now";
    }

    return <>{linkText} <Link href={commit_url.padEnd(12, '\u00A0')} target="_blank">{commit_id.substring(0, 8)}</Link></>;
  });
}