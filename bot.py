import logging
from telegram import Update,ReplyKeyboardMarkup,ReplyKeyboardRemove,InlineQueryResultArticle,InputTextMessageContent
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler,ConversationHandler,MessageHandler,filters,InlineQueryHandler

# bot name : first

bot_token = '2083798148:AAGB6fgCsW_-6M6k-cTAtjKVKvDmC63v5rA'

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

logger=logging.getLogger(__name__)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user=update.message.from_user
    user_info=user.username
    await context.bot.send_message(chat_id=update.effective_chat.id, text=f"hello {user_info}")


async def help(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id, text='how can i help you?')

async def caps(update:Update,context:ContextTypes.DEFAULT_TYPE):
    text_cap=' '.join(context.args).upper()
    logger.info('upper of  %s: %s',context.args,text_cap)
    await context.bot.send_message(chat_id=update.effective_chat.id,text=text_cap)

async def inline_caps(update:Update,context:ContextTypes.DEFAULT_TYPE):
    query=update.inline_query.query
    if not query:
        return
    result=[]
    result.append(
        InlineQueryResultArticle(
            id=query.upper(),
            title='Caps',
            input_message_content=InputTextMessageContent(query.upper())
        )
    )
    await context.bot.answer_inline_query(update.inline_query.id,result)

async def unknown_commands(update:Update,context:ContextTypes.DEFAULT_TYPE):
    logger.info('unknown command is: %s',update.message.text)
    await context.bot.send_message(chat_id=update.effective_chat.id,text="Sorry, I didn't understand that command.")



if __name__ == '__main__':
    application = ApplicationBuilder().token(bot_token).read_timeout(30).write_timeout(30).build()

    start_handler = CommandHandler('start', start)
    help_handler = CommandHandler('help', help)
    caps_handler=CommandHandler('caps',caps)
    inline_handler=InlineQueryHandler(inline_caps)
    unknown_commands_handler=MessageHandler(filters.COMMAND,unknown_commands)

    application.add_handler(start_handler)
    application.add_handler(help_handler)
    application.add_handler(caps_handler)
    application.add_handler(inline_handler)
    application.add_handler(unknown_commands_handler)

    application.run_polling()

