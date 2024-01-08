const queryUser = `
{
    user{
        id, 
        login,
        firstName,
        lastName,
        email,
        attrs
        campus,
        auditRatio

        xp: transactions_aggregate(
            where: {
              type: { _like: "xp" },
              _and: [
                { path: { _nlike: "%/piscine-js/%" } },
                { path: { _nlike: "%/piscine-go/%" } },
              ]
            }
            order_by: { amount: desc }
          ) {
            aggregate {
              sum {
                amount
              }
            }
          }
    },
}
`

const last3BigProjects = (xp) => {
    const query =  `
    {
        user{
        transactions(where: {
          type: {_like: ${xp}}
        }
        order_by: {amount: desc}
        limit: 5)
        {
          amount
          path
        }
      
      }
    }
    
    `
    return query
}

//recup les exos validés avec leurs xps
const query3 = `
{
    user {
      xps(
        where: {
          _and: [
            { path: { _nlike: "%/piscine-js/%" } },
            { path: { _nlike: "%/piscine-go/%" } },
            { path: { _nlike: "%/checkpoint/%" } }
          ]
        },
        order_by: { amount: desc }
      ) {
        amount
        path
        userId
      }
    }
}`

//User up down ration
const query4 = `
{
    user {
      upAmount: transactions_aggregate(where: {type: {_eq: "up"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
      downAmount: transactions_aggregate(where: {type: {_eq: "down"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
}`

//level amount
const query5 = `
{
    user{
        transactions(where: {type: {_eq: "level"}} order_by: {amount: desc} limit: 1){
          amount
          type
            path
        }
    }
}` 
