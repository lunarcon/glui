import * as React from "react";
import { Switch } from "@fluentui/react-components";

export const ToggleSwitch = ({action, state=false, label="Switch"}) => {
  const [checked, setChecked] = React.useState(state);
  const onChange = React.useCallback(
    (ev) => {
      setChecked(ev.currentTarget.checked);
      action(ev.currentTarget.checked);
    },
    [setChecked, action]
  );

  return (
    <div style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center'}}>
        {label+" "}
        <Switch
        checked={checked}
        onChange={onChange}
        label={checked ? "On" : "Off"}
        labelPosition="after"
        />
    </div>
  );
};