# zoom-autolink

*Unified gateway to join online lectures at MSRIT for 4th semester students in the Computer Science and Engineering branch.*

Uses the current Date and Time to pick the right URL from a *Deta database*. The endpoint is deployed on a *Vercel environment* and also exposes an API and webpage to allow for CRUD of the class links.

The service is written in NodeJS and the webpage designed *(barely)* using HTML and vanilla JS.

## Endpoints
| Endpoint           | Type | Description                                |
|--------------------|------|--------------------------------------------|
| /                  | GET  | Redirects to your lecture                  |
| /updatett          | POST | Replaces the list of links at your Deta DB |
| /api/updatett.html | GET  | Basic webpage for CRUD of links daywise    |

## Usage guidelines
1. Install Vercel CLI

    `npm  i -g vercel`
    
2. Create your Deta DB and name it as tt

3. obtain the API KEY and run this command 
   vercel secrets add PROJECT_API_KEY Your_API_Key_Here

4. Install dependencies

    `npm i `
 
5. Setup your Vercel dev environment

    `vercel dev`
    
    You will be asked to
    - Create/login to a Vercel account.
    - Verify project settings, at this point edit the settings your CLI as follows
      - **Build Command:** *CLEAR THE DEFAULT SETTING*
      - **Output Directory:** *Hit Enter key to leave as is*
      - **Development Command:** *Hit Enter key to leave as is*
    - Launch your server in the browser at the specified port.
    
6. You're all set to go, customize the functions and add some design to the webpage to use this for yourself/your class.

**Do leave a 🌟 if you liked it**
