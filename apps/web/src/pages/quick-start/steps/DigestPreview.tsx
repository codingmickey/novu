import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { ReactFlowProvider } from 'react-flow-renderer';

import { GetStartedLayout } from '../components/layout/GetStartedLayout';

import useStyles from '../components/OnboardingSteps.styles';
import { ArrowLeft } from '../../../design-system/icons';
import { ArrowLeftGradient } from '../../../design-system/icons/gradient/ArrowLeftGradient';
import { getStartedSteps, OnBoardingAnalyticsEnum } from '../consts';
import { Label } from '../../../design-system/typography/label';
import { ROUTES } from '../../../constants/routes.enum';
import { HeaderSecondaryTitle, HeaderTitle } from '../components/layout/HeaderLayout';
import { NavButton } from '../components/NavButton';
import { useSegment } from '../../../components/providers/SegmentProvider';
import { useCreateDigestDemoWorkflow } from '../../../api/hooks/notification-templates/useCreateDigestDemoWorkflow';
import { Button } from '../../../design-system';
import { DigestDemoFlow } from '../../../components';

export function DigestPreview() {
  const segment = useSegment();

  useEffect(() => {
    segment.track(OnBoardingAnalyticsEnum.BUILD_WORKFLOW_VISIT);
  }, []);

  return (
    <GetStartedLayout
      header={
        <>
          <HeaderTitle>Set-up steps to get started</HeaderTitle>
          <HeaderSecondaryTitle>Quick Start Guide</HeaderSecondaryTitle>
        </>
      }
      footer={{
        leftSide: <FooterLeftSide />,
        rightSide: <FooterRightSide />,
      }}
    >
      <DemoContainer>
        <ReactFlowProvider>
          <DigestDemoFlowStyled />
        </ReactFlowProvider>
      </DemoContainer>
    </GetStartedLayout>
  );
}
function FooterLeftSide() {
  const { theme } = useStyles();
  const segment = useSegment();
  const gradientColor = theme.colorScheme === 'dark' ? 'none' : 'red';

  function handleOnClick() {
    segment.track(OnBoardingAnalyticsEnum.BUILD_WORKFLOW_PREVIOUS_PAGE_CLICK);
  }

  return (
    <NavButton navigateTo={getStartedSteps.first} handleOnClick={handleOnClick}>
      <ThemeArrowLeft style={{ marginRight: '10px' }} />
      <Label gradientColor={gradientColor}>Previous</Label>
    </NavButton>
  );
}

function FooterRightSide() {
  const segment = useSegment();
  const { createDigestDemoWorkflow, isLoading: isCreating } = useCreateDigestDemoWorkflow();

  function handlerBuildWorkflowClick() {
    segment.track(OnBoardingAnalyticsEnum.BUILD_WORKFLOW_CLICK);
  }

  function handlerTryDigestClick() {
    segment.track(OnBoardingAnalyticsEnum.BUILD_WORKFLOW_TRY_DIGEST_PLAYGROUND_CLICK);
    createDigestDemoWorkflow();
  }

  return (
    <ButtonsHolder>
      <NavButton navigateTo={ROUTES.WORKFLOWS_CREATE} handleOnClick={handlerBuildWorkflowClick}>
        <ButtonText>Build a Workflow</ButtonText>
      </NavButton>
      <StyledButton
        fullWidth
        pulse
        onClick={handlerTryDigestClick}
        loading={isCreating}
        data-test-id="try-digest-playground-btn"
      >
        <ButtonText>Try the Digest Playground</ButtonText>
      </StyledButton>
    </ButtonsHolder>
  );
}

const StyledButton = styled(Button)`
  height: 50px;
`;

const DigestDemoFlowStyled = styled(DigestDemoFlow)`
  height: 400px;
`;

const ButtonsHolder = styled.div`
  display: flex;
  gap: 40px;
`;

const DemoContainer = styled.div`
  width: 400px;

  @media screen and (min-width: 1367px) {
    width: 450px;
  }

  @media screen and (min-width: 1921px) {
    width: 600px;
  }
`;

const ButtonText = styled.div`
  font-size: 16px;
`;

function ThemeArrowLeft(props: React.ComponentPropsWithoutRef<'svg'>) {
  const { theme } = useStyles();

  return <>{theme.colorScheme === 'dark' ? <ArrowLeft {...props} /> : <ArrowLeftGradient {...props} />}</>;
}
