import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/routes"
import Layout from "./layout/Layout"

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
