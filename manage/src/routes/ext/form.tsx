import {
  EuiButton,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiLink,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiSelect,
  EuiSpacer,
  EuiText,
  EuiTextArea,
} from '@elastic/eui';
import Form, { useForm } from 'rc-field-form';
import * as React from 'react';
import {
  DatePickerRange,
  Range,
  Switch,
  DatePicker,
  ColorPalettePicker,
  ColorPicker,
  ComboBox,
  SuperSelect,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  ButtonGroup,
} from '../../components/formControls';
import FormRow from '../../components/formRow';

export interface IExtFormProps {}

export default function ExtForm(props: IExtFormProps) {
  const [form] = useForm();
  const handleFinish = values => {
    console.log(values);
  };
  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <Form
            form={form}
            onFinish={handleFinish}
            className="euiForm"
            initialValues={{
              chk: true,
              chkGroup: { chkGroupdemo1: true },
              radioGroup: 'radioGroupdemo1',
              comboBox: [{ label: 'Mimas' }],
              superSelect: 'option_two',
              colorPicker: '#8A6565',
              datePicker: 1604419200000,
            }}
          >
            <EuiSpacer />

            <EuiButton type="submit" fill>
              Save form
            </EuiButton>
            <EuiSpacer />

            <FormRow
              name="buttonGroup"
              label="ButtonGroup"
              helpText="I am some friendly help text."
            >
              <ButtonGroup
                options={[
                  { id: 'buttonGroupdemo1', label: '西瓜' },
                  { id: 'buttonGroupdemo2', label: '卷心菜' },
                  { id: 'buttonGroupdemo3', label: '水蜜桃' },
                ]}
              />
            </FormRow>

            <FormRow
              name="range"
              label="Range"
              helpText="I am some friendly help text."
            >
              <Range min={0} max={100} step={1} showLabels showValue />
            </FormRow>

            <FormRow
              name="datePickerRange"
              label="DatePickerRange"
              helpText="I am some friendly help text."
            >
              <DatePickerRange />
            </FormRow>

            <FormRow
              name="datePicker"
              label="DatePicker"
              helpText="I am some friendly help text."
            >
              <DatePicker showTimeSelect locale="zh-cn" />
            </FormRow>

            <FormRow
              name="colorPalettePicker"
              label="ColorPalettePicker"
              helpText="I am some friendly help text."
            >
              <ColorPalettePicker />
            </FormRow>

            <FormRow
              name="colorPicker"
              label="ColorPicker"
              helpText="I am some friendly help text."
            >
              <ColorPicker />
            </FormRow>

            <FormRow
              name="comboBox"
              label="ComboBox"
              helpText="I am some friendly help text."
            >
              <ComboBox
                options={[
                  {
                    label: 'Titan',
                    'data-test-subj': 'titanOption',
                  },
                  {
                    label: 'Enceladus is disabled',
                    disabled: true,
                  },
                  {
                    label: 'Mimas',
                  },
                  {
                    label: 'Dione',
                  },
                  {
                    label: 'Iapetus',
                  },
                  {
                    label: 'Phoebe',
                  },
                  {
                    label: 'Rhea',
                  },
                  {
                    label:
                      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
                  },
                  {
                    label: 'Tethys',
                  },
                  {
                    label: 'Hyperion',
                  },
                ]}
              />
            </FormRow>

            <FormRow
              name="superSelect"
              label="SuperSelect"
              helpText="I am some friendly help text."
            >
              <SuperSelect
                options={[
                  {
                    value: 'option_one',
                    inputDisplay: 'Option one',
                    dropdownDisplay: (
                      <React.Fragment>
                        <strong>Option one</strong>
                        <EuiText size="s" color="subdued">
                          <p className="euiTextColor--subdued">
                            Has a short description giving more detail to the
                            option.
                          </p>
                        </EuiText>
                      </React.Fragment>
                    ),
                  },
                  {
                    value: 'option_two',
                    inputDisplay: 'Option two',
                    dropdownDisplay: (
                      <React.Fragment>
                        <strong>Option two</strong>
                        <EuiText size="s" color="subdued">
                          <p className="euiTextColor--subdued">
                            Has a short description giving more detail to the
                            option.
                          </p>
                        </EuiText>
                      </React.Fragment>
                    ),
                  },
                  {
                    value: 'option_three',
                    inputDisplay: 'Option three',
                    disabled: true,
                    dropdownDisplay: (
                      <React.Fragment>
                        <strong>Option three</strong>
                        <EuiText size="s" color="subdued">
                          <p className="euiTextColor--subdued">
                            Has a short description giving more detail to the
                            option.
                          </p>
                        </EuiText>
                      </React.Fragment>
                    ),
                  },
                ]}
              />
            </FormRow>

            <FormRow
              hasChildLabel={true}
              name="switch"
              label="EuiSwitch"
              helpText="I am some friendly help text."
            >
              <Switch label="I am a switch" />
            </FormRow>

            <FormRow
              name="radioGroup"
              label="RadioGroup"
              helpText="I am some friendly help text."
            >
              <RadioGroup
                options={[
                  { id: 'radioGroupdemo1', label: '西瓜' },
                  { id: 'radioGroupdemo2', label: '卷心菜' },
                  { id: 'radioGroupdemo3', label: '水蜜桃', disabled: true },
                ]}
              />
            </FormRow>

            <FormRow
              hasChildLabel={true}
              name="radio"
              label="EuiRadio"
              helpText="I am some friendly help text."
            >
              <Radio label="I am a radio" />
            </FormRow>

            <FormRow
              name="chkGroup"
              label="CheckboxGroup"
              helpText="I am some friendly help text."
            >
              <CheckboxGroup
                options={[
                  { id: 'chkGroupdemo1', label: '西瓜' },
                  { id: 'chkGroupdemo2', label: '卷心菜' },
                  { id: 'chkGroupdemo3', label: '水蜜桃', disabled: true },
                ]}
              />
            </FormRow>

            <FormRow
              hasChildLabel={true}
              name="chk"
              label="EuiCheckbox"
              helpText="I am some friendly help text."
            >
              <Checkbox label="I am a checkbox" />
            </FormRow>

            <FormRow
              name="txt"
              label="EuiFieldText"
              helpText="I am some friendly help text."
            >
              <EuiFieldText />
            </FormRow>

            <FormRow
              name="num"
              label="EuiFieldNumber"
              helpText="I am some friendly help text."
            >
              <EuiFieldNumber />
            </FormRow>

            <FormRow
              name="search"
              label="EuiFieldSearch"
              helpText="I am some friendly help text."
            >
              <EuiFieldSearch />
            </FormRow>

            <FormRow
              name="pwd"
              label="EuiFieldPassword"
              helpText="I am some friendly help text."
            >
              <EuiFieldPassword />
            </FormRow>
            <FormRow
              name="info"
              label="EuiTextArea"
              helpText="I am some friendly help text."
            >
              <EuiTextArea />
            </FormRow>

            <FormRow
              name="opt"
              label="Select (with no initial selection)"
              labelAppend={
                <EuiText size="xs">
                  <EuiLink>Link to some help</EuiLink>
                </EuiText>
              }
            >
              <EuiSelect
                hasNoInitialSelection
                options={[
                  { value: 'option_one', text: 'Option one' },
                  { value: 'option_two', text: 'Option two' },
                  { value: 'option_three', text: 'Option three' },
                ]}
              />
            </FormRow>

            {/* <EuiFormRow label="File picker">
              <EuiFilePicker />
            </EuiFormRow> */}

            {/* <EuiFormRow label="Range">
              <EuiRange min={0} max={100} name="range" id="range" />
            </EuiFormRow> */}

            {/* <EuiFormRow
              label="Use a switch instead of a single checkbox and set 'hasChildLabel' to false"
              hasChildLabel={false}>
              <EuiSwitch
                name="switch"
                label="Should we do this?"
                checked={isSwitchChecked}
                onChange={onSwitchChange}
              />
            </EuiFormRow> */}

            <EuiSpacer />

            {/* <EuiCheckboxGroup
              options={checkboxes}
              idToSelectedMap={checkboxIdToSelectedMap}
              onChange={onCheckboxChange}
              legend={{
                children:
                  'Checkbox groups should use the `legend` prop instead of form row',
              }}
            /> */}

            <EuiSpacer />

            <EuiButton type="submit" fill>
              Save form
            </EuiButton>
          </Form>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
