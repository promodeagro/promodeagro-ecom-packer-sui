import { Container, ContentLayout, Header, Link } from '@cloudscape-design/components'
import React from 'react'

const Dashboard = () => {
  return (
    <ContentLayout
    headerVariant='high-contrast'
    header={
      <Header variant="h1" info={<Link variant="info">Info</Link>}>
      Dashboard
      </Header>
    }
  >
    <Container
      header={
        <Header variant="h2" description="Container description">
          Container header
        </Header>
      }
    >
      <div className="contentPlaceholder" />
    </Container>
  </ContentLayout>
  )
}

export default Dashboard