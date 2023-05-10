import { type Communicate } from '../domain';

interface LintProject {
  communicate: Communicate.Execute;
  message: string;
}

export const lintProject = ({ communicate, message }: LintProject): void => {
  communicate.execute({
    type: 'warning',
    message: 'Start project linting...',
  });

  communicate.toolbox.system
    .spawn(`npx eslint src/ --fix`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit',
    })
    .finally(() => {
      communicate.execute({
        type: 'success',
        message,
      });
    });
};
