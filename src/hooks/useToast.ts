import { useToastContext } from '@ama-pt/agora-design-system'

export const useToast = () => {
  const { showToast } = useToastContext()

  const showCustomToast = (
    options: {
      id: number
      title: string
      description: string
      type: 'success' | 'failure' | 'info' | 'warning'
      closeLabel: string
    },
    duration: number,
  ) => {
    showToast(options, duration)
  }

  return { showCustomToast }
}
