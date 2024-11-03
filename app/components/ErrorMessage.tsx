import { Text } from '@radix-ui/themes'

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text color='red' as='p'>
      {children}
    </Text>
  )
}

export default ErrorMessage
