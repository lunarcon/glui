import * as React from "react";
import { ToggleSwitch } from './ToggleSwitch';
import { Button, Input, Label } from "@fluentui/react-components";
import { getAllRepositories } from "./api";
import RepoTable from "./RepoTable";
import SettingsDlg from "./SettingsDlg";

const regex = localStorage.getItem("regex");
const url = localStorage.getItem("gitlab_url");
const token = localStorage.getItem("token");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repolist: [],
      filterTerm: regex || "",
      failOnly: false
    };
    if (url && token) {
      getAllRepositories().then((result) => {this.setState({repolist: result}); console.log(this.state.repolist[0]);})
    }
  }

  render() {
    return (  
      <div className="App" style={{ paddingBottom: '20px', height: '100%'}}>
        <div style={{ position: 'sticky', top: '0', zIndex: '1', padding: '20px', backgroundColor: '#2f2f2f', boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.55)'}}>
        <SettingsDlg />
        <Label style={{color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '20px'}}>GLUI</Label>
        <ToggleSwitch action={(checked) => {
          this.setState({failOnly: checked});
        }}
        label="Filter Passing"/>
        <Button onClick={() => {
          this.setState({repolist: []});
          getAllRepositories().then((result) => {this.setState({repolist: result}); console.log(this.state.repolist[1]);})}
        }
           style={{float: 'right', marginLeft: '10px'}}>Refresh</Button>
        <Input placeholder={"Filter (default "+regex+")"} onChange={(event) => this.setState({filterTerm: event.target.value})} style={{float: 'right', width: '200px'}}></Input>
        </div>
        <RepoTable items={this.state.repolist} filter={this.state.filterTerm} failOnly={this.state.failOnly}/>
        
      </div>
    );
  }

}

export default App;
