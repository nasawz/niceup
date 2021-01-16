import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiText,
  EuiButtonIcon,
  EuiFieldText,
  EuiPopover,
  EuiToolTip,
  EuiSpacer,
} from '@elastic/eui';
import * as React from 'react';
import { useToast } from '../../hook/useToast';
import { app } from '../../lib/tcb';

export interface IExtScfProps {}

export default function ExtScf(props: IExtScfProps) {
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { showToast } = useToast();
  const handleChange = e => {
    setValue(e.target.value);
  };
  const getBase64Encoding = (base64: string) => {
    if (!base64) {
      showToast('Base64 字符串不能为空！', 'danger', 'alert');
      return;
    }
    setLoading(true);

    app
      .callFunction({
        name: 'base64',
        data: {
          str: base64,
        },
      })
      .then((res: any) => {
        setResult(res.result.data);
      })
      .catch((err: any) => {
        showToast(err.message, 'danger', 'alert');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const calc = () => {
    getBase64Encoding(value);
  };
  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Cloud Function</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection></EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiFieldText
              isLoading={loading}
              placeholder="输入要编码的字符串"
              onChange={handleChange}
              value={value}
              append={[
                <EuiPopover
                  key="t"
                  button={
                    <EuiButtonIcon
                      iconType="wrench"
                      aria-label="计算"
                      onClick={calc}
                    />
                  }
                  closePopover={() => {}}
                />,
              ]}
              aria-label="Use aria labels when no actual label is in use"
            />
            <EuiSpacer size="s" />
            {result && (
              <EuiText grow={false}>
                <pre>
                  <code>{result}</code>
                </pre>
              </EuiText>
            )}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
