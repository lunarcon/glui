import * as React from "react"

import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    Input,
    Label,
    Link,
    Tooltip,
    RadioGroup,
    Radio,
} from "@fluentui/react-components";

import { ToggleSwitch } from "./ToggleSwitch";

import { SettingsRegular, InfoRegular, WarningRegular } from '@fluentui/react-icons';

class SettingsDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: localStorage.getItem("gitlab_url") || "",
            regex: localStorage.getItem("regex") || "",
            main_gid: localStorage.getItem("main_gid") || "",
            token: localStorage.getItem("token") || "",
            dark: localStorage.getItem("dark")==="true" || false,
            open: props.open || false
        };
        if (this.state.url === "") {
            this.state.url = "https://kgcoe-git.rit.edu";
        }
        if (this.state.regex === "") {
            this.state.regex = "rest-.+";
        }
    }

    render() {
        return (
            <Dialog open={this.state.open} onOpenChange={(open) => this.setState({open: open})}>
                <DialogTrigger>
                    <Button icon={<SettingsRegular />} style={{float: 'right'}}></Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogContent>
                        <DialogBody style={{display: 'flex', flexDirection: 'column', marginBottom: '20px', marginTop: '20px'}}>
                            <Label>Gitlab URL</Label>
                            <Input placeholder={"https://kgcoe-git.rit.edu"} onChange={(event) => this.setState({url: event.target.value})} value={this.state.url}></Input>
                            <Label>Default regex to filter repositories</Label>
                            <Input placeholder={"rest-.+"} onChange={(event) => this.setState({regex: event.target.value})} value={this.state.regex}></Input>
                            <Tooltip content={"This will be cleared if you clear your cache. For security reasons, do not save it. Revoke and re-enter the token every two weeks"} relationship="label"><Label>Gitlab Personal Access Token <InfoRegular/> <Link href="https://kgcoe-git.rit.edu/-/profile/personal_access_tokens" target="_blank">Generate</Link></Label></Tooltip>
                            <Input type="password" placeholder={"Generate a personal access token"} onChange={(event) => this.setState({token: event.target.value})} value={this.state.token}></Input>
                            <Tooltip content={"Go to "+this.state.url+"/yearsemester-dept-course-section (ex. 2231-swen-344-04) and copy the group id"} relationship="label"><Label>Main Group ID <InfoRegular/></Label></Tooltip>
                            <Input placeholder={"123456"} onChange={(event) => this.setState({main_gid: event.target.value})} value={this.state.main_gid}></Input>
                            <Label>On main list, display pipeline status of</Label>
                            <RadioGroup>
                                <Radio name="status" value="latest" defaultChecked={true} label={"Latest Branch"}></Radio>
                                <Radio name="status" value="default" label={"Default Branch"}></Radio>
                            </RadioGroup>
                            <ToggleSwitch label="Dark Mode" state={this.state.dark} action={(checked) => {localStorage.setItem("dark", checked); window.location.reload();}}/>
                        </DialogBody>
                    </DialogContent>
                    <DialogActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button appearance="primary" onClick={() => {
                            localStorage.setItem("gitlab_url", this.state.url);
                            localStorage.setItem("token", this.state.token);
                            localStorage.setItem("regex", this.state.regex);
                            localStorage.setItem("main_gid", this.state.main_gid);
                            window.location.reload();
                        }}>Save</Button>
                        <Button onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}><WarningRegular style={{marginRight: '5px'}}/>Clear</Button>
                        <Button onClick={() => {
                            this.setState({open: false});
                        }}>Close</Button>
                    </DialogActions>
                </DialogSurface>
            </Dialog>
        );
    }
}

export default SettingsDlg;