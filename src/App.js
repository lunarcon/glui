import * as React from "react";
import { ToggleSwitch } from './ToggleSwitch';
import { Button, Input, Label } from "@fluentui/react-components";
import { getAllRepositories } from "./api";
import { ArrowClockwiseRegular } from '@fluentui/react-icons';
import RepoTable from "./RepoTable";
import SettingsDlg from "./SettingsDlg";
import HelpDialog from "./HelpDlg";

const regex = localStorage.getItem("regex");
const url = localStorage.getItem("gitlab_url");
const token = localStorage.getItem("token");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repolist: [],
      filterTerm: regex || "",
      failOnly: false,
      loaded: false
    };
    this.addRepoCallback = this.addRepoCallback.bind(this);
  }

  componentDidMount() {
    getAllRepositories(this.addRepoCallback).then(() => {this.setState({loaded: true});});
  }

  addRepoCallback(repo) {
    this.setState({repolist: [...this.state.repolist, repo]});
  }

  render() {
    return (  
      <div className="App" style={{ paddingBottom: '20px', height: '100%'}}>
        {/* make it resize when item flows to bottom */}
        <div style={{position: 'sticky', top: '0', zIndex: '1', padding: '20px', backgroundColor: '#2f2f2f', boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.55)', overflow: 'auto'}}>
        <HelpDialog/>
        <SettingsDlg open={regex === null || url === null || token === null}/>
        <Label style={{color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '20px'}}>GLUI</Label>
        <ToggleSwitch action={(checked) => {
          this.setState({failOnly: checked});
        }}
        label="Filter Passing"/>
        <Button appearance={
          !this.state.loaded ? "primary" : "outline"
        } onClick={() => {
          this.setState({repolist: [], loaded: false});
          getAllRepositories(this.addRepoCallback).then(() => {this.setState({loaded: true});})
        }}
        style={{float: 'right', marginLeft: '10px'}} icon={<ArrowClockwiseRegular/>}></Button>
        <Input placeholder={"Search/Filter (default "+regex+")"} onChange={(event) => this.setState({filterTerm: event.target.value})} style={{float: 'right', width: '200px'}}></Input>
        </div>
        <RepoTable items={this.state.repolist} filter={this.state.filterTerm} failOnly={this.state.failOnly} loaded={this.state.loaded}/>
        
      </div>
    );
  }

}

export default App;
