import { Component, OnInit } from '@angular/core';
import { BOT, USER } from './constants';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  data: any[] = []; //all data from file

  messages: any[] = []; // chat

  stockMarkets: string[] = []; // array of strings with market name

  chosenStockMarket: any = ""; // the chosen exchange

  botScreen = 1; // chat stage
  showChat = false;

  buttonText: string = "Test";

  constructor(private http: HttpClient) {

    this.http.get('assets/data/data.json').subscribe({
      next: res => {
        if (res instanceof Array) {
          this.data = res;
        }
        this.showChat = true;
        this.startChatBot();
        console.log(this.data)
      },
      error: err => {
        console.log(err);
        alert(err.status + " " + err.statusText)
      },
      complete: () => console.log('Observable emitted the complete notification')
      // err => { console.log("ERRORce faci!" + err); }
    })
  }

  ngOnInit(): void {
  }

  startChatBot() {
    this.initialData();
    this.loadMessages();
  }

  private setMessageForRequestedStockMarket(requestedStockMarket: any): void {
    let botReply = this.buildMessageWithStocks(requestedStockMarket.topStocks);
    console.log(botReply);
    this.sendMessageFromBot(botReply);
  }

  private getStocks(requestedStock: string): boolean {
    let stockMarketResponse = {};

    requestedStock = requestedStock.toLowerCase().trim();

    if (requestedStock === "stock" || requestedStock == "exchange" || requestedStock.length < 3) {
      alert("Not enough details!");
      return false;
    }

    this.data.forEach(market => {
      if (market.stockExchange.toLowerCase() === requestedStock
        || market.stockExchange.toLowerCase().includes(requestedStock)
        || market.code.toLowerCase() === requestedStock
      ) {
        stockMarketResponse = market;
      }
    })

    console.log("Piata: ");
    console.log(stockMarketResponse);

    if (stockMarketResponse && Object.keys(stockMarketResponse).length > 0) {
      this.setMessageForRequestedStockMarket(stockMarketResponse);
    } else {
      alert("Stock market not found");
      return false;
    }

    this.chosenStockMarket = stockMarketResponse;

    return true;
  }

  sendMessage(event: any): void {
    console.log("Bot SCREEN: " + this.botScreen);
    this.sendReplyMsg(event.message);

    switch (this.botScreen) { //user choose stock market
      case 1: {
        if (this.getStocks(event.message) === true) {
          this.setBotScreen(2);
        }
        break;
      }

      case 2: {
        if (this.getStockPrices(event.message) === true) {
          this.setBotScreen(3);
        }
        break;
      }

      case 3: {
        if (event.message.toLowerCase().trim() === "main menu"
          || event.message.toLowerCase().trim().includes("menu")
          || event.message.toLowerCase().trim().includes("main")) {
          this.goToMenu();

        } else if (event.message.toLowerCase().trim() === "go back"
          || event.message.toLowerCase().trim() === "back"
          || event.message.toLowerCase().trim().includes("go")) {
          this.goBack();
        }
        break;
      }
    }

  }
  private goBack(): void {
    //reset variables
    this.setBotScreen(2);
    this.setMessageForRequestedStockMarket(this.chosenStockMarket)

  }

  private goToMenu(): void {
    //reset variables
    this.chosenStockMarket = {};
    this.setBotScreen(1);
    this.loadMessages();
  }

  protected setBotScreen(screen: any) {
    this.botScreen = screen
  }

  private getStockPrices(stockName: string): boolean {
    let myStock: {
      code: string,
      price: number,
      stockName: string
    };

    stockName = stockName.toLowerCase().trim();

    if (stockName.length < 3) {
      alert("Not enough details!");
      return false;
    }

    myStock = this.chosenStockMarket.topStocks.find((stock: any) =>
      stock.code.toLowerCase() === stockName ||
      stock.stockName.toLowerCase() === stockName ||
      stock.stockName.toLowerCase().includes(stockName)
    )

    console.log("chosenStock: ")
    console.log(myStock);

    if (myStock && Object.keys(myStock).length > 0) {
      this.buildMessageWithStockDetails(myStock);
    } else {
      alert("Stock not found! ")
      return false;
    }

    return true;
  }

  private buildMessageWithStockDetails(stock: {
    code: string,
    price: number,
    stockName: string
  }) {

    let msg = "Stock price of " + stock.stockName + " is " + stock.price + ". ";
    msg += "Please select next option:\n";
    msg += "Main menu \nGo Back";
    this.sendMessageFromBot(msg);
  }

  private sendMessageFromBot(msgText: string): void {
    this.messages.push(
      {
        text: msgText,
        date: new Date(),
        reply: false,
        user: BOT
      })
  }

  private buildMessageWithStocks(stockList: any[]): string {
    let myText: string = "";

    stockList.forEach(stock => {
      myText += stock.stockName + "\n";
    })

    return myText;

  }

  private loadMessages(): void {
    let myText = this.stockMarkets.join("\n");

    // this.stockMarkets.forEach(stock => {
    // this.messages.push({
    //   type: 'button',
    //   customMessageData: myText,
    //   reply: false,
    //   date: new Date(),
    //   user: {
    //     name: BOT_NAME,
    //     avatar: '',
    //   },
    // })
    // });

    this.messages.push(
      {
        text: myText,
        date: new Date(),
        reply: false,
        user: BOT
      })
  }

  private initialData(): any {

    this.data.forEach(x => {
      this.stockMarkets.push(x.stockExchange); // TO DO
    })

    console.log("Main stocks: " + this.stockMarkets);
  }

  private sendReplyMsg(msgText: string): void {
    this.messages.push({
      reply: true,
      text: msgText,
      date: new Date(),
      user: USER
    })
  }
}
