import logo from './logo.svg';
import './App.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Checkbox, Table, Flex, Box, Heading, Inset, Text, Button, Card, Strong } from '@radix-ui/themes';



function App() {



  return (
    <Theme>

    <div className="App">
      <Heading color="cyan">Qwik Groceries Generator</Heading>


      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Qty</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell><Checkbox /> </Table.RowHeaderCell>
            <Table.RowHeaderCell>Item1</Table.RowHeaderCell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>Dairy</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell><Checkbox /> </Table.RowHeaderCell>
            <Table.RowHeaderCell>Item2</Table.RowHeaderCell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Meat</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell><Checkbox /> </Table.RowHeaderCell>
            <Table.RowHeaderCell>Item3</Table.RowHeaderCell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>Canned Goods</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <header>
        <Text>Tell us your secret recipe</Text>
        <br></br>
        <Button>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          Add Recipe</Button>
      </header>
      

      <div>
      <Heading align="left">Recommended Recipes</Heading>
      
      <Flex gap="1">
        <Box width="auto" height="25">
          <Card size="2" style={{ maxWidth: 240 }}>
          <Inset clip="padding-box" side="top" pb="current">
          <img
          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Bold typography"
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 140,
            backgroundColor: 'var(--gray-5)',
            }}
          />
          </Inset>
            <Text as="p" size="3">
            <Strong>Recipe1</Strong>Randome recipes
            </Text>
          </Card>
        </Box>
        <Box width="auto" height="25">
          <Card size="2" style={{ maxWidth: 240 }}>
          <Inset clip="padding-box" side="top" pb="current">
          <img
          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Bold typography"
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 140,
            backgroundColor: 'var(--gray-5)',
            }}
          />
          </Inset>
            <Text as="p" size="3">
            <Strong>Recipe1 Name</Strong>
            </Text>
          </Card>
        </Box>
        <Box width="auto" height="25">
          <Card size="2" style={{ maxWidth: 240 }}>
          <Inset clip="padding-box" side="top" pb="current">
          <img
          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          alt="Bold typography"
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 140,
            backgroundColor: 'var(--gray-5)',
            }}
          />
          </Inset>
            <Text as="p" size="3">
            <Strong>Recipe 3 Name</Strong>
            </Text>
          </Card>
        </Box>
      </Flex>
      <Button variant="outline">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      View more recipes</Button>





        </div>



    </div>
    

    </Theme>

  );
}

export default App;
