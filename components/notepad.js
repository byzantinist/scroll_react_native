
              <Card style={styles.card}>
                <CardItem>
                  <Text>Charlie really likes kittens!</Text>
                </CardItem>
                <CardItem>
                  <Image style={styles.image} source={{uri: "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg"}}
                  />
                </CardItem>
                <CardItem>
                  <Text>They are much better than silly goldendoodles!</Text>
                </CardItem>
              </Card>

              <Card style={styles.card}>
                <CardItem>
                  <Text>Ruby is a Red Panda who eats bamboo and Sour Patch Kids</Text>
                </CardItem>
                <CardItem>
                  <Image style={styles.image} source={{uri: "https://i.ytimg.com/vi/b6dT4kyVUuY/maxresdefault.jpg"}}
                  />
                </CardItem>
                <CardItem>
                  <Text>Item description</Text>
                </CardItem>
              </Card>

              <Card style={styles.card}>
                <CardItem>
                  <Text>Ruby is also a master assassin who will eliminate all of your enemies for the right price!</Text>
                </CardItem>
                <CardItem>
                  <Image style={styles.image} source={{uri: "https://i.pinimg.com/736x/e4/a0/43/e4a043311adecfe96ef70416687a3ed7--pandas-playing-too-cute.jpg"}} />
                </CardItem>
                <CardItem>
                  <Text>Item description</Text>
                </CardItem>
              </Card>

              {this.renderItem()}
