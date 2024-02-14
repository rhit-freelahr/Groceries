import logo from './logo.svg';
import './App.css';
import '@radix-ui/themes/styles.css';
import { Container, Theme } from '@radix-ui/themes';
import { ScrollArea, Separator, Grid, Checkbox, Table, Flex, Box, Heading, Inset, Text, Button, Card, Strong } from '@radix-ui/themes';
import * as Dialog from "@radix-ui/react-dialog"
import jsonData from './data.json'
import recipeData from './recipes.json'


  
function Groceries({itemlist, recipes}) {
  return (
    <Theme accentColor="gray">
      
      <div className="NavAndContent" >
        <Flex direction="column" m="5">
          
          <Text size="6" weight="bold">Quik Groceries</Text>  
          
          <Separator my="3" size="9" />
         
          <Text size="6" weight="bold">Home</Text>  
          <Text size="6" weight="bold">Shopping List</Text>  
          <Text size="6" weight="bold">Add Recipe</Text>  
          <Text size="6" weight="bold">View Recipe</Text>  
          <Text size="6" weight="bold">Profile</Text>  
          <Text size="6" weight="bold">About us</Text>  

        </Flex>

        <Flex direction="column" gap="3" style={{ background: 'var(--gray-a4)'}}>
        <ScrollArea type="always" scrollbars="vertical"> 
        {/* Title and quick view of grocery list */}
          <Box grow="3">
            <header>
            <Heading color="cyan">Qwik Groceries Generator</Heading>
            </header>
            <Container size="3">            
              <ProductTable itemlist = {itemlist} />
            </Container>
          </Box>

          <Box grow="3">
            <div>
              <Text>Tell us your secret recipe</Text>
              <br></br>
              <Button>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              Add Recipe</Button>
            </div>
          </Box>

          <Box grow="3">
            <RecommendedRecipes recipes ={recipes} />
          </Box>
          
        </ScrollArea>     
        </Flex>
      </div>  

    <div className="App">
    </div>
    </Theme>

  );
}

function ProductRow({ item }) {

  return (
    <Theme>
    <tr>
      <td><Checkbox /></td>
      <td>{item.itemName}</td>
      <td>{item.qty}</td>
      <td>{item.category}</td>
    </tr>
    </Theme>
  );
}


function ProductTable({itemlist}) {
  const rows= [];
  
  itemlist.forEach((item) =>{
    rows.push(
      <ProductRow
        item={item}
        />
    );
  });
  return (
    <Theme>
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
          <Table.Cell>{rows}</Table.Cell>
        </Table.Row>

      </Table.Body>
    </Table.Root>
    </Theme>
  )
}

function AddRecipe(){
}

function RecipeCard ({recipe}) {
  
  return(
    <>
      <Dialog.Root>
        <Dialog.Trigger className='recipe-button'>
          <Box width="auto" height="30">
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
              <Strong>{recipe.name}</Strong>
              </Text>
            </Card>
          </Box>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className='recipe-modal-overlay'>
            <Dialog.Content className='recipe-modal' >
                <h2>{recipe.name}</h2>
            </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
      </Dialog.Root>
    </>
      
  )
}

function RecommendedRecipes({recipes}) {
const recipesList = []

recipes.forEach(rec => {
  recipesList.push(rec);
})
  return(
    <Theme>
      <Heading align="left">Recommended Recipes</Heading>
      
      <Flex gap="9">
      <RecipeCard recipe={recipesList[0]}/>

        {/* <Box width="auto" height="30">
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
        <Box width="auto" height="30">
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
        </Box> */}
      </Flex>
      <Button variant="outline">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      View more recipes</Button>
    </Theme> 
  )
};

export default function App(){
  return <Groceries itemlist ={jsonData} recipes={recipeData}/>;
}