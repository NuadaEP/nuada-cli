import { CreateModule } from '../domain';

export const formatModuleName = (
  name: string
): CreateModule.Response<string> => {
  if (!name) {
    return {
      success: false,
      data: {
        message: 'Ops. You forgot to pass the name of this module 🙃',
      },
    };
  }

  const formatedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  return {
    success: true,
    data: {
      message: `Yeah! We validate the filename ${formatedName}`,
      data: formatedName,
    },
  };
};
