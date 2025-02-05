import Step from "@mui/material/Step";
import { FaCircleCheck } from "react-icons/fa6";
import Stepper from "@mui/material/Stepper";
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import Typography from "@mui/material/Typography";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

interface ProcessBarProp {
    steps: string[],
    progress: number
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#B423F8',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#B423F8',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
        ...theme.applyStyles('dark', {
        borderColor: theme.palette.grey[800],
        }),
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme }) => ({
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        '& .QontoStepIcon-completedIcon': {
        color: '#B423F8',
        zIndex: 1,
        fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        },
        ...theme.applyStyles('dark', {
        color: theme.palette.grey[700],
        }),
        variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
            color: '#B423F8',
            },
        },
        ],
    }),
);

const QontoStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
            <FaCircleCheck className="QontoStepIcon-completedIcon" size={25} />
        ) : (
            <div className="QontoStepIcon-circle" />
        )}
        </QontoStepIconRoot>
    );
}

export default function ProcessBar({ steps, progress }:ProcessBarProp) {
    return (
        <Stepper className="mt-4 mb-5" alternativeLabel activeStep={progress} connector={<QontoConnector />}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>
                        <Typography sx={{ fontFamily: "Mitr, sans-serif", color: '#821bb3', fontSize: "0.85rem" }}>
                            {label}
                        </Typography>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}