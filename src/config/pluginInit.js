import Snackbar from 'node-snackbar'
import 'node-snackbar/dist/snackbar.min.css'
import i18n from '../locales'
const { t } = i18n.global

export const core = {
  showSnackbar(type, data = '') {
    if (type !== null) {
      switch (type) {
        case 'success':
          Snackbar.show({ text: data, backgroundColor: '#323232', actionText: t('global.dismiss') })
          break
        case 'error':
          Snackbar.show({
            text: data,
            backgroundColor: '#b21f2d',
            actionTextColor: '#ffffff',
            actionText: t('global.dismiss')
          })
          break
      }
    } else {
      Snackbar.show(data)
    }
  },
}
