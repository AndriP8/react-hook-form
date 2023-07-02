import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: '',
      exampleRequired: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('example'));

  return (
    <Box
      minH={'100vh'}
      width={'100vw'}
      backgroundColor="blue.900"
      color="white"
    >
      <Box width={500} marginInline="auto" paddingBlock={20}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={8} direction={'column'}>
            <Input defaultValue="test" {...register('example')} />
            <Input
              {...register('exampleRequired', {
                required: true,
              })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default App;
