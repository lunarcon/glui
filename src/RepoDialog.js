import * as React from "react";

import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Link,
  Label,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components";

import {
    BranchRegular,
    StatusRegular,
    LinkRegular,
    MailRegular
  } from "@fluentui/react-icons";

import { getAllBranchStatuses } from "./api";

class RepoInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closeAction: this.props.closeCallback || null,
      allStatuses: [],
      open: this.props.open || false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.repo !== prevProps.repo) {
      this.setState({ repo: this.props.repo });
      if (this.props.repo && this.props.repo.id) {
        getAllBranchStatuses(this.props.repo).then((result) => {
          this.setState({ allStatuses: result });
          console.log(this.state.allStatuses);
        });
      }
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.repo !== null}
        onOpenChange={(open) => this.setState({ open: open })}
        disableBackdropClick={true}
      >
        <DialogSurface>
          <div
            style={{
              display: "flex",
              flexDirection: "col",
              justifyContent: "space-between",
            }}
          >
            <DialogTitle>
              Details for {this.state.repo ? this.state.repo.name : ""}
            </DialogTitle>
            <Link
              href={this.state.repo ? this.state.repo.web_url : ""}
              target="_blank"
            >
              View on GitLab
            </Link>
          </div>
          <Label style={{ marginRight: "10px" }}>
            {this.state.repo ? this.state.repo.description : ""}
          </Label>
          <Label disabled={true}>
            {this.state.repo ? this.state.repo.namespace.full_path : ""}
          </Label>

          <DialogContent>
            <DialogBody>
              <DialogContent
                style={{ paddingBottom: "20px", paddingTop: "10px" }}
              >
                <Table aria-label="Repo Table">
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell><BranchRegular/> Branch</TableHeaderCell>
                      <TableHeaderCell><StatusRegular/> Latest CI status</TableHeaderCell>
                      <TableHeaderCell><LinkRegular/></TableHeaderCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {this.state.repo ? (
                        Object.keys(this.state.allStatuses).map((branch) => {
                            let status = this.state.allStatuses[branch];
                            return (
                            <TableRow key={branch}>
                                <TableCell>
                                <TableCellLayout>
                                    <Label
                                    style={{
                                        marginRight: "10px",
                                        fontWeight: "bold",
                                    }}
                                    >
                                    {branch.padEnd(12, "\u00A0")}
                                    </Label>
                                </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                <TableCellLayout>
                                    <Label style={{ marginRight: "10px" }}>
                                    {status === "success"
                                        ? "✅ Passing"
                                        : status === "failed"
                                        ? "❌ Failed"
                                        : "- Other"}
                                    </Label>
                                </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <Link href={this.state.repo.web_url + "/-/tree/" + branch} target="_blank">
                                        View this branch
                                    </Link>
                                </TableCell>
                            </TableRow>
                            );
                        })
                        ) : (
                        <></>
                        )}
                  </TableBody>
                </Table>
              </DialogContent>
            </DialogBody>
          </DialogContent>
          <DialogActions>
            <Button style={{float: 'right'}}
              onClick={() => {
                this.setState({ open: false });
                if (this.state.closeAction) {
                  this.state.closeAction();
                }
              }}
            >
              Close
            </Button>
            <Button
              appearance="primary"
              onClick={() => {
                navigator.clipboard.writeText(this.state.repo.ssh_url_to_repo);
                alert("Copied to clipboard");
              }}
            >
              Copy SSH URL
            </Button>
            <Button
                appearance="primary"
                onClick={() => {
                    navigator.clipboard.writeText(
                    this.state.repo.name.split("-")[1] + "@rit.edu"
                    );
                }}
                icon={<MailRegular />}
                >
                Copy Email
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    );
  }
}

export default RepoInfoDialog;
