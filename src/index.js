import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
import App from 'components/App/App'
import { AppProvider as Provider } from 'context/Context'
import reportWebVitals from './reportWebVitals'
import './index.css'


Amplify.configure(awsExports)

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
)

reportWebVitals()
