Debug MR https://gitlab.com/organisation/group/project/-/merge_requests/1337

Me: create -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 @Toto

Bot: create -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 Toto elle est pour toi
`
Bot: update -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 @Toto elle est pour toi [Je relis]
Toto: Click -> Je relis

**\*\*** Bot: update -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 @Toto elle est pour toi (en cours de relecture) [Approuve][commenté]

## Scénario 1 :

- Toto: (Click) -> Approuve

## Scénario 2 :

- Toto: (Click) -> Commenté

- Bot: (Update) -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 @Toto elle est pour toi [Fix]

- Me: (Click) -> Fix

- GOTO **\*\***

## Fin commune

- Bot: (Update) -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 @Toto elle est pour toi [Merge]

Me: Click -> Merge

Bot: update -> https://gitlab.com/organisation/group/project/-/merge_requests/1337 Ok ()
2

### Actions

identifiant /url/idMR
example /organisation/group/project/1337

- Je relis -> Read
- Approuvé -> Approuved
- Commenté -> Commented
- Fix -> Fixed
- Merge -> Merged

### TODO

- Ajouter la possibilité de cancel/declined
- Link gitlab
- Link trello
- Article medium
