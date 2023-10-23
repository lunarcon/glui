import * as React from 'react';

import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
} from "@fluentui/react-components";

import { QuestionCircleRegular } from '@fluentui/react-icons';

class HelpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false
        };
    }

    render() {
        return (
            <Dialog open={this.state.open} onOpenChange={(open) => this.setState({open: open})}>
                <DialogTrigger>
                    <Button icon={<QuestionCircleRegular/>} style={{float: 'right'}}></Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogTitle>Help</DialogTitle>
                    <DialogContent>
                        <DialogBody>
                            <p>Some help here.</p>
                        </DialogBody>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({open: false})}>Close</Button>
                    </DialogActions>
                </DialogSurface>
            </Dialog>
        );
    }
}

export default HelpDialog;