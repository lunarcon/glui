import * as React from "react";
import {
  EditRegular,
  BranchRegular,
  ArrowDownRegular,
  LinkRegular,
  MailRegular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Avatar,
  Button,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  Tooltip,
} from "@fluentui/react-components";

import { TableSkeleton } from "./TableSkeleton";

const columns = [
  { columnKey: "url", label: "Group and Repository" },
  { columnKey: "cistatus", label: "CI and Branches" },
  { columnKey: "lastcommit", label: "Last Commit" },
];

const url = localStorage.getItem("gitlab_url");
const token = localStorage.getItem("token");
class RepoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      filter: props.filter,
      failOnly: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ items: this.props.items });
    }
    if (this.props.filter !== prevProps.filter) {
      this.setState({ filter: this.props.filter });
    }
    if (this.props.failOnly !== prevProps.failOnly) {
      this.setState({ failOnly: this.props.failOnly });
    }
  }

  render() {
    return (
      <Table
        aria-label="Repo Table"
        style={{
          marginTop: "20px",
          marginRight: "2%",
          marginLeft: "2%",
          width: "96%",
        }}
      >
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.items
            .filter((item) => {
              return item.name.match(this.state.filter);
            })
            .filter((item) => {
              return !this.state.failOnly || item.cistatus !== "success";
            })
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <TableCellLayout>
                    <Tooltip content={"Group " + getGroupNo(item)}>
                      <Avatar
                        initials={"" + getGroupNo(item)}
                        color="colorful"
                      />
                    </Tooltip>
                    <Tooltip content={"Go to repository"}>
                      <Button
                        icon={<LinkRegular />}
                        style={{ fontFamily: "monospace", marginLeft: "10px" }}
                        onClick={() => window.open(item.web_url, "_blank")}
                      >
                        {item.name.padEnd(12, "\u00A0")}
                      </Button>
                    </Tooltip>
                    <Tooltip content={"Copy SSH URL"}>
                      <Button
                        icon={<ArrowDownRegular />}
                        appearance="primary"
                        onClick={() => {
                          navigator.clipboard.writeText(item.ssh_url_to_repo);
                          alert("Copied to clipboard");
                        }}
                      ></Button>
                    </Tooltip>
                    <Tooltip content={"Copy Email"}>
                      <Button
                        icon={<MailRegular />}
                        appearance="subtle"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            item.name.split("-")[1] + "@rit.edu"
                          );
                          alert("Copied to clipboard");
                        }}
                      ></Button>
                    </Tooltip>
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>
                      {renderCIStatus(item)} <BranchRegular />{" "}
                      {item.branches.join(", ")}
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>
                      <EditRegular /> {item.latestcommit}
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}

          {this.state.items.length === 0 &&
            url !== null &&
            token !== null &&
            renderTableSkeleton()}
          {this.state.items.length === 0 &&
            url !== null &&
            token !== null &&
            renderTableSkeleton()}
          {this.state.items.length === 0 &&
            url !== null &&
            token !== null &&
            renderTableSkeleton()}
          {this.state.items.length === 0 &&
            url !== null &&
            token !== null &&
            renderTableSkeleton()}
          {this.state.items.length === 0 &&
            url !== null &&
            token !== null &&
            renderTableSkeleton()}

          {(url === null || token === null) && (
            <MessageBar
              intent="error"
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                width: "95vw",
                boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.2)",
              }}
            >
              <MessageBarTitle>
                Configuration Incomplete or Not Present
              </MessageBarTitle>
              <MessageBarBody>
                Please set up or finish your GitLab configuration in settings
              </MessageBarBody>
            </MessageBar>
          )}

          {this.state.items.length === 0 && url !== null && token !== null && (
            <MessageBar
              intent="info"
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                width: "95vw",
                boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.2)",
              }}
            >
              <MessageBarTitle>Fetching Repositories</MessageBarTitle>
              <MessageBarBody>
                This may take around fifteen seconds.
              </MessageBarBody>
            </MessageBar>
          )}
        </TableBody>
      </Table>
    );
  }
}

function renderTableSkeleton() {
  return <TableSkeleton />;
}

function renderCIStatus(item) {
  if (item.cistatus === "success") {
    return <div style={{ color: "#00b300" }}>{"\u2714"}</div>;
  } else if (item.cistatus === "failed") {
    return <div style={{ color: "#e60000" }}>{"\u2718"}</div>;
  } else {
    return <div style={{ color: "#a6a6a6" }}>{"\u2014"}</div>;
  }
}

function getGroupNo(item) {
  return item.web_url.split("/")[4].split("-")[2];
}

export default RepoTable;
